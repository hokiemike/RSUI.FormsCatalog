using AutoMapper;
using ICSharpCode.SharpZipLib.Core;
using ICSharpCode.SharpZipLib.Zip;
using log4net;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.SignalR;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Transform;
using RSUI.Common.Autofac;
using RSUI.Common.Data.Entities;
using RSUI.Common.Web.Security;
using RSUI.FormsCatalog.hubs;
using RSUI.FormsCatalog.Models;
using RSUI.FormsCatalog.Models.Forms;
using RSUI.FormsCatalog.Models.RuleBasedDocs;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace RSUI.FormsCatalog.Controllers.api
{
	[System.Web.Http.Authorize]
	[RoutePrefix("api/catalogs")]
	public class CatalogsController : ApiController
	{
		private readonly IAccountService _accountService;
		private ISession _session;
		protected static readonly ILog Log = LogManager.GetLogger(typeof(CatalogsController));
		private static string _formCatalogServiceUrl;

		public CatalogsController(IAccountService accountService, ISession session)
		{
			_accountService = accountService;
			_session = session;
			_formCatalogServiceUrl = "http://localhost/FormsCatalogService";
			//formCatalogServiceUrl = "http://mstarrdev1/formcatalog";
		}

		#region DataTables Methods

		[HttpPost]
		[Route("find/forms/table")]
		public IHttpActionResult FindGroupFormsTable(FindFormsTableParameters model)
		{

			var sorted = model.Columns.FirstOrDefault(x => x.IsSorted);

			var sqlPrefix = @"SELECT DISTINCT rbd.DocID, rbd.Comment, rbd.DocNumber, rbd.Edition, rbd.Name, rbdt.Description AS DocType, rbdt.FileType, EffectiveDate = (SELECT Max(EffectiveDate) FROM RuleBasedDocStateApproval WHERE DocId = rbd.DocId GROUP BY DocId), SUBSTRING((SELECT '|' + st.Description FROM RuleBasedDocSubTypeXref AS stxref LEFT OUTER JOIN RuleBasedDocSubType AS st ON stxref.SubTypeId = st.SubTypeId WHERE stxref.DocId = rbd.DocId FOR XML PATH('')), 2, 200000) AS SubTypesPiped, 
CASE WHEN ((SELECT CAST(COUNT(*) as INT)
        FROM   dbo.RuleBasedDocStateApproval sa0
        WHERE  rbd.DocId = sa0.DocId) > 1
							 AND NOT (EXISTS (SELECT sa01.StateApprovalId
                        FROM   dbo.RuleBasedDocStateApproval sa01
                        WHERE  rbd.DocId = sa01.DocId
                               AND NOT (sa01.EffectiveDate <= '" + DateTime.Now.ToString("yyyy-MM-ddThh:mm:ss") + @"'
                                        AND (sa01.ExpirationDate IS NOT NULL) AND '" + DateTime.Now.ToString("yyyy-MM-ddThh:mm:ss") + @"' > sa01.ExpirationDate)))) THEN 1 ELSE 0 END AS Inactive
FROM  RuleBasedDoc AS rbd INNER JOIN RuleBasedDocType AS rbdt ON rbd.DocTypeId = rbdt.DocTypeId LEFT OUTER JOIN dbo.RuleBasedDocSubTypeXref rbdstxref on rbd.DocId = rbdstxref.DocId WHERE  rbd.DocId IN (SELECT TOP 100000 DocId FROM RuleBasedDocStateApproval GROUP BY DocId ORDER BY MAX(EffectiveDate) DESC) AND rbd.DEPARTMENT_NUMBER = " + model.DepartmentId + (model.DocTypes.Count > 0 ? @" AND (rbdt.Description IN (" + model.DocTypes.Select(x => "'" + x + "'").Aggregate((s1, s2) => s1 + ", " + s2) + @"))" : " AND 1 = 2") + " AND (SELECT cast(count(*) as INT) FROM dbo.RuleBasedDocStateApproval sa WHERE  rbd.DocId = sa.DocId) >= 1";

			var subTypes = model.SubTypes.Any(x => x == 0)
					? @"AND (rbdstxref.SubTypeId in (" + model.SubTypes.Select(x => x.ToString(CultureInfo.InvariantCulture)).Aggregate((i1, i2) => i1 + ", " + i2) + @") OR (SELECT cast(count(*) as INT) FROM dbo.RuleBasedDocSubTypeXref xref WHERE  rbd.DocId = xref.DocId) = 0 )"
					: model.SubTypes.Count > 0 ? @"AND rbdstxref.SubTypeId in (" + model.SubTypes.Select(x => x.ToString(CultureInfo.InvariantCulture)).Aggregate((i1, i2) => i1 + ", " + i2) + @")" : "AND 1 =2";

			var filter = "";
			if (!String.IsNullOrWhiteSpace(model.GlobalSearchText))
			{
				var rgx = new Regex("\\b(rsg)(\\d+)\\b");
				var keywords = rgx.Replace(model.GlobalSearchText.ToLower(), "$1 $2");
				//filter = @"AND (( rbd.DocNumber != NULL AND LOWER(rbd.DocNumber) LIKE '%" + keywords.ToLower() + @"%') OR ( LOWER(rbd.Name) LIKE '%" + keywords.ToLower() + @"%'))";
				filter = @"AND (LOWER(rbd.DocNumber) LIKE '%" + keywords.ToLower() + @"%' OR LOWER(rbd.Name) LIKE '%" + keywords.ToLower() + @"%' OR LOWER(rbd.Comment) LIKE '%" + keywords.ToLower() + @"%')";
			}

			var admitted = "";
			if (model.Admitted.ToLower() != "all")
			{
				admitted = @"AND (SELECT CAST(COUNT(*) as INT)
            FROM   dbo.RuleBasedDocStateApproval sa5
            WHERE  rbd.DocId = sa5.DocId) >= 1
									 AND (EXISTS (SELECT sa6.StateApprovalId
												FROM   dbo.RuleBasedDocStateApproval sa6
												WHERE  rbd.DocId = sa6.DocId
															 AND sa6.Admitted = " + (bool.Parse(model.Admitted) ? "1" : "0") + @"
															 AND '" + DateTime.Now.ToString("yyyy-MM-ddThh:mm:ss") + @"' >= sa6.EffectiveDate
															 AND (sa6.ExpirationDate IS NULL OR '" + DateTime.Now.ToString("yyyy-MM-ddThh:mm:ss") + @"' < sa6.ExpirationDate)))";
			}

			var activeInactive = "";
			if (model.IncludeInactive)
			{
				activeInactive = @"AND (NOT (EXISTS (SELECT sa3.StateApprovalId
                         FROM   dbo.RuleBasedDocStateApproval sa3
                         WHERE  rbd.DocId = sa3.DocId
                                AND NOT (sa3.EffectiveDate <= '" + DateTime.Now.ToString("yyyy-MM-ddThh:mm:ss") + @"'
                                         AND (sa3.ExpirationDate IS NOT NULL)
                                         AND '" + DateTime.Now.ToString("yyyy-MM-ddThh:mm:ss") + @"' > sa3.ExpirationDate)))
             OR EXISTS (SELECT sa4.StateApprovalId
																FROM   dbo.RuleBasedDocStateApproval sa4
																WHERE  rbd.DocId = sa4.DocId
																			 AND sa4.EffectiveDate <= '" + DateTime.Now.AddMonths(1).ToString("yyyy-MM-ddThh:mm:ss") + @"'
																			 AND (sa4.ExpirationDate IS NULL OR '" + "2014-12-03T10:49:20" + "' < sa4.ExpirationDate)))";
			}
			else
			{
				activeInactive = @"AND (EXISTS (SELECT sa4.StateApprovalId
																FROM   dbo.RuleBasedDocStateApproval sa4
																WHERE  rbd.DocId = sa4.DocId
																			 AND sa4.EffectiveDate <= '" + DateTime.Now.AddMonths(1).ToString("yyyy-MM-ddThh:mm:ss") + @"'
																			 AND (sa4.ExpirationDate IS NULL OR '" + "2014-12-03T10:49:20" + "' < sa4.ExpirationDate)))";
			}

			var orderBy = @"";
			if (sorted != null)
				if (sorted.SortDirection == "asc")
					switch (sorted.ColumnName.ToLower())
					{
						case "name":
							orderBy = "ORDER BY rbd.Name ASC"; // baseQuery = baseQuery.OrderBy(x => x.Name);
							break;
						case "doctype":
							orderBy = "ORDER BY rbddt.Description ASC"; // baseQuery = baseQuery.OrderBy(x => x.RuleBasedDocType.Description);
							break;
					}
				else
					switch (sorted.ColumnName.ToLower())
					{
						case "name":
							orderBy = "ORDER BY rbd.Name DESC"; // baseQuery = baseQuery.OrderByDescending(x => x.Name);
							break;
						case "doctype":
							orderBy = "ORDER BY rbddt.Description DESC"; // baseQuery = baseQuery.OrderByDescending(x => x.RuleBasedDocType.Description);
							break;
					}

			const string groupBy = @"GROUP BY rbd.DocId, rbd.Comment, rbd.DocNumber, rbd.Edition, rbd.Name, rbdt.Description, rbdt.FileType";
			var sqlSuffix = @"OFFSET " + model.RecordsToSkip + @" ROWS FETCH NEXT " + model.RecordsToTake + @" ROWS ONLY";

			var sql = new StringBuilder();
			sql.AppendFormat("{0} {1} {2} {3} {4} {5} {6} {7}", sqlPrefix, activeInactive, admitted, filter, subTypes, groupBy, orderBy, sqlSuffix);

			var countSql = new StringBuilder();
			countSql.AppendFormat("SELECT COUNT(*) FROM ({0} {1} {2} {3} {4} {5}) AS countedResult", sqlPrefix, activeInactive, admitted, filter, subTypes, groupBy);

			var totalCount = (int)_session.CreateSQLQuery(countSql.ToString()).UniqueResult();

			return Ok(new DataGridResult<FormDto>
			{
				Data = _session.CreateSQLQuery(sql.ToString()).SetResultTransformer(Transformers.AliasToBean(typeof(FormDto))).List<FormDto>(),
				DisplayedRecords = totalCount,
				TotalRecords = totalCount
			});
		}

		[HttpPost]
		[Route("whats/new/table")]
		public IHttpActionResult WhatsNewTable(FindFormsTableParameters model)
		{
			return
				Ok(new DataGridResult<FormDto>
				{
					Data = _session.CreateSQLQuery(@"SELECT TOP 20 rbd.DocID, rbd.Comment, rbd.DocNumber, rbd.Edition, rbd.Name, rbdt.Description AS DocType, rbdt.FileType, EffectiveDate = (SELECT Max(EffectiveDate) FROM RuleBasedDocStateApproval WHERE DocId = rbd.DocId GROUP BY DocId), SUBSTRING((SELECT '|' + st.Description FROM RuleBasedDocSubTypeXref AS stxref INNER JOIN RuleBasedDocSubType AS st ON stxref.SubTypeId = st.SubTypeId WHERE stxref.DocId = rbd.DocId FOR XML PATH('')), 2, 200000) AS SubTypesPiped
FROM   RuleBasedDoc AS rbd INNER JOIN RuleBasedDocType AS rbdt ON rbd.DocTypeId = rbdt.DocTypeId 
WHERE  rbd.DocId IN (SELECT TOP 100000 DocId FROM RuleBasedDocStateApproval GROUP BY DocId ORDER BY MAX(EffectiveDate) DESC) AND rbd.DEPARTMENT_NUMBER = " + model.DepartmentId + @" 
GROUP  BY rbd.DocId, rbd.Comment, rbd.DocNumber, rbd.Edition, rbd.Name, rbdt.Description, rbdt.FileType ORDER  BY EffectiveDate DESC").SetResultTransformer(Transformers.AliasToBean(typeof(FormDto))).List<FormDto>(),
					DisplayedRecords = model.RecordsToTake,
					TotalRecords = model.RecordsToTake
				});
		}

		#endregion

		#region API For General Use

		[HttpGet]
		[Route("dept/{deptid}/all/forms", Name = "AllFormsByDept")]
		public HttpResponseMessage AllFormCatalogByDept(int deptid)
		{
			if (!ModelState.IsValid) return CreateErrorResponseMessage();
			var baseQuery = GetBaseQueryforActiveDocs(deptid);
			var totalCount = baseQuery.Count();
			var forms = baseQuery.ToList().Select(Mapper.Map<RuleBasedDoc, RuleBasedDocModel>);

			return Request.CreateResponse(HttpStatusCode.OK, new { TotalCount = totalCount, Results = forms.ToList() });
		}

		[HttpGet]
		[Route("dept/{deptid}/all/inactive/forms", Name = "AllInactiveFormsByDept")]
		public HttpResponseMessage AllInactiveFormCatalogByDept(int deptid)
		{
			if (!ModelState.IsValid) return CreateErrorResponseMessage();
			var baseQuery = GetBaseQueryforInactiveDocs(deptid);
			var totalCount = baseQuery.Count();
			var forms = baseQuery.ToList().Select(Mapper.Map<RuleBasedDoc, RuleBasedDocModel>);

			return Request.CreateResponse(HttpStatusCode.OK, new { TotalCount = totalCount, Results = forms.ToList() });
		}

		[HttpGet]
		[Route("dept/{deptid}/subtypes", Name = "SubtypesByDept")]
		public HttpResponseMessage SubTypesForDept(int deptid)
		{
			if (!ModelState.IsValid) return CreateErrorResponseMessage();
			var baseQuery = _session.Query<RuleBasedDocSubType>().Where(x => x.Department.Id == deptid);// GetBaseQueryforActiveDocs(deptid);

			var docList = baseQuery.ToList();

			var models = docList.Select(
					xref =>
						new SubTypeModel()
						{
							Id = xref.Id,
							Desc = xref.Description
						})
				.DistinctBy(d => d.Id).ToList();

			models.Insert(0, new SubTypeModel { Id = 0, Desc = "No Category" });

			return Request.CreateResponse(HttpStatusCode.OK, models);
		}

		[HttpGet]
		[Route("dept/{deptid}/doctypes", Name = "DocTypesByDept")]
		public HttpResponseMessage DocTypesForDept(int deptid)
		{
			if (!ModelState.IsValid) return CreateErrorResponseMessage();
			var baseQuery =
				_session.Query<RuleBasedDocSubType>().Where(x => x.Department.Id == deptid).SelectMany(x => x.RuleBasedDocTypes); // GetBaseQueryforActiveDocs(deptid);

			var docList = baseQuery.ToList();

			var doctypes = docList.Select(rbd => new DocTypeModel
			{
				DocType = rbd.Description,
				DocTypeId = rbd.Id.ToString(CultureInfo.InvariantCulture),
				FileType = rbd.FileType
			}).Distinct();

			return Request.CreateResponse(HttpStatusCode.OK, doctypes);
		}

		protected HttpResponseMessage CreateErrorResponseMessage()
		{
			//var errors = (from state in ModelState.Values from error in state.Errors  select error.ErrorMessage).ToList();
			var errors = new List<string>();
			foreach (var modelState in ModelState.Values)
			{
				errors.AddRange(modelState.Errors.Select(error => error.ErrorMessage + " " + error.Exception));
			}
			return Request.CreateResponse(HttpStatusCode.Forbidden, errors);
		}

		protected IQueryable<RuleBasedDoc> GetBaseQueryforActiveDocs(int dept)
		{
			return _session.Query<RuleBasedDoc>()
							.Where(rbd => rbd.Department.Id == dept
														&& rbd.RuleBasedDocStateApprovals.Count >= 1
														&& rbd.RuleBasedDocStateApprovals.Any(
															sa => sa.EffectiveDate <= DateTime.Now.AddMonths(1)
																&& (sa.ExpirationDate == null || DateTime.Now.AddMonths(1) < sa.ExpirationDate)));
		}

		protected IQueryable<RuleBasedDoc> GetBaseQueryforAllDocs(int dept)
		{
			return _session.Query<RuleBasedDoc>()
							.Where(rbd => rbd.Department.Id == dept
														&& rbd.RuleBasedDocStateApprovals.Count >= 1
														&& ((rbd.RuleBasedDocStateApprovals.All(
																sa => sa.EffectiveDate <= DateTime.Now && (sa.ExpirationDate != null && DateTime.Now > sa.ExpirationDate))
																|| rbd.RuleBasedDocStateApprovals.Any(
																		sa => sa.EffectiveDate <= DateTime.Now.AddMonths(1) &&
																			(sa.ExpirationDate == null || DateTime.Now.AddMonths(1) < sa.ExpirationDate)))));
		}


		protected IQueryable<RuleBasedDoc> GetBaseQueryforInactiveDocs(int dept)
		{
			return _session.Query<RuleBasedDoc>()
							.Where(rbd => rbd.Department.Id == dept
														&& rbd.RuleBasedDocStateApprovals.Count >= 1
														&& rbd.RuleBasedDocStateApprovals.All(
																sa =>
																		sa.EffectiveDate <= DateTime.Now
																		&& (sa.ExpirationDate != null && DateTime.Now > sa.ExpirationDate)));
		}


		#endregion

		[HttpGet]
		[Route("download/doc/{docId}")]
		public HttpResponseMessage DocDownload(string docId)
		{
			//application/vnd.openxmlformats-officedocument.wordprocessingml.document
			//application/msword

			var response = Request.CreateResponse(HttpStatusCode.OK);
			var formUrl = ConfigurationManager.AppSettings["FormsServiceUrl"];
			var elements = docId.Split('-');
			var model = _session.Load<RuleBasedDoc>(int.Parse(elements[0]));

			try
			{
				// If the no DocNumber, then a form would not be generated.
				if (String.IsNullOrWhiteSpace(model.DocNumber)) { return null; }

				var client = new WebClient();
				MemoryStream formMemoryStream;
				try
				{
					var url = formUrl + model.Id + (elements[2] == "1" ? "?native=true" : String.Empty);
					formMemoryStream = new MemoryStream(client.DownloadData(url));
				}
				finally
				{
					client.Dispose();
				}

				if (model.RuleBasedDocType.FileType.ToLower() != "pdf" || elements[2] == "1")
				{
					response.Content = new ByteArrayContent(formMemoryStream.ToArray());
					response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/msword");
					response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
					{
						FileName = model.Name.Trim() + ".doc"
					};
				}
				else
				{
					response.Content = new ByteArrayContent(formMemoryStream.ToArray());
					response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
					response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
					{
						FileName = model.Name.Trim() + ".pdf"
					};
				}
				return response;
			}
			catch(Exception ex)
			{
				var mesage = ex.Message;
				return response;
			}
		}

		#region Private Helper Methods

		//private async Task<List<Form>> GetActiveDocsForDepartment(int departmentId, DataTableColumnCriteria sort, int skip, int take)
		//{
		//	var client = new HttpClient() { MaxResponseContentBufferSize = 1000000 };

		//	// Create and start the tasks.
		//	var forms = ProcessUrlStringAsync(string.Format("{0}/dept/{1}/all/forms/{2}/{3}/{4}", _formCatalogServiceUrl, departmentId, sort, skip, take), client);

		//	// Await task. 
		//	var formResponse = await forms;
		//	client.Dispose();

		//	return JsonConvert.DeserializeObject<AllFormsLookupResponse>(formResponse).Results.ToList();
		//}

		//private async Task<List<Form>> GetInactiveDocsForDepartment(int departmentId, DataTableColumnCriteria sort, int skip, int take)
		//{
		//	var client = new HttpClient() { MaxResponseContentBufferSize = 1000000 };

		//	// Create and start the tasks.
		//	var forms = ProcessUrlStringAsync(string.Format("{0}/dept/{1}/all/inactive/forms/{2}/{3}/{4}", _formCatalogServiceUrl, departmentId, sort, skip, take), client);

		//	// Await task. 
		//	var formResponse = await forms;
		//	client.Dispose();

		//	return JsonConvert.DeserializeObject<AllFormsLookupResponse>(formResponse).Results.ToList();
		//}

		private async Task<string> ProcessUrlStringAsync(string url, HttpClient client)
		{
			return await client.GetStringAsync(url);
		}

		#endregion

		#region Filter Lookups

		[HttpGet]
		[Route("{id}/department/filters")]
		public IHttpActionResult DepartmentFilters(int id)
		{

			if (User.Identity is RsuiExIdentity)
			{
				var type = "rsuiex";
			}


			//SELECT DISTINCT p.FIRST_NAME, p.LAST_NAME, d.DEPARTMENT_NUMBER, d.DEPARTMENT_DESCRIPTION
			//FROM dbo.PEOPLE AS p
			//JOIN dbo.PEOPLE_LOCATION_XREF AS plx ON plx.PEOPLE_SKEY = p.PEOPLE_SKEY
			//JOIN dbo.LOCATION_XREF AS lx ON lx.LOCATION_XREF_SKEY = plx.LOCATION_XREF_SKEY
			//JOIN dbo.DEPARTMENTS AS d ON d.DEPARTMENT_NUMBER = lx.DEPARTMENT_NUMBER
			//WHERE p.ACTIVE_CODE = 'A'
			//AND plx.ACTIVE_CODE = 'A'
			//AND lx.ACTIVE_CODE = 'A'
			//AND d.IsActive = 1
			//--AND p.EXTERNAL_LOGIN = 'rsuiex\RLugo1'
			//AND p.PEOPLE_SKEY = 148

			//SELECT DISTINCT p.FIRST_NAME, p.LAST_NAME, p.EXTERNAL_LOGIN, d.DEPARTMENT_NUMBER, d.DEPARTMENT_DESCRIPTION
			//FROM dbo.PEOPLE AS p
			//JOIN dbo.PEOPLE_LOCATION_XREF AS plx ON plx.PEOPLE_SKEY = p.PEOPLE_SKEY
			//JOIN dbo.LOCATION_XREF AS lx ON lx.LOCATION_XREF_SKEY = plx.LOCATION_XREF_SKEY
			//JOIN dbo.DEPARTMENTS AS d ON d.DEPARTMENT_NUMBER = lx.DEPARTMENT_NUMBER
			//WHERE p.ACTIVE_CODE = 'A'
			//AND plx.ACTIVE_CODE = 'A'
			//AND lx.ACTIVE_CODE = 'A'
			//AND d.IsActive = 1
			//AND p.EXTERNAL_LOGIN IS NOT null


			var baseQuery = _session.Query<RuleBasedDoc>().Where(x => x.Department.Id == id && x.Department.IsActive).Select(x => x.RuleBasedDocType);
			var docList = baseQuery.ToList().DistinctBy(x => x.Id).ToList();
			var doctypes = docList.Select(rbd => new DocTypeModel
				{
					DocType = rbd.Description,
					DocTypeId = rbd.Id.ToString(CultureInfo.InvariantCulture),
					FileType = rbd.FileType,
					Selected = true
				}).DistinctBy(x => x.DocTypeId);

			var subQuery = _session.Query<RuleBasedDoc>().Where(x => x.Department.Id == id).SelectMany(x => x.RuleBasedDocSubTypeXrefs).Select(x => x.RuleBasedDocSubType);
			var subList = subQuery.DistinctBy(x => x.Id).ToList();
			var subTypes = subList.Select(st => new SubTypeModel()
				{
					Id = st.Id,
					Desc = st.Description,
					Selected = true
				}).DistinctBy(d => d.Id).ToList();
			subTypes.Insert(0, new SubTypeModel { Id = 0, Desc = "No Category", Selected = true });

			return Ok(new
			{
				DocTypes = doctypes.OrderBy(x => x.DocType),
				SubTypes = subTypes.OrderBy(x => x.Desc)
			});
		}

		#endregion

		#region Selected Forms Actions

		[HttpPost]
		[Route("get/zip/file")]
		public IHttpActionResult GetZipDownload(GetZipDownloadRequestModel model)
		{
			try
			{
				var formUrl = ConfigurationManager.AppSettings["FormsServiceUrl"];
				var username = User.Identity.Name;

				var url = HttpContext.Current.Request.Url;
				Task.Run(() =>
				{
					var formsContainedInZipFile = new List<Form>();
					var formsNotInZipFile = new List<Form>();
					try
					{
						var outputMemStream = new MemoryStream();
						var zipStream = new ZipOutputStream(outputMemStream);
						zipStream.SetLevel(3); //0-9, 9 being the highest level of compression

						foreach (var form in model.SelectedForms)
						{
							try
							{
								// If the no DocNumber, then a form would not be generated.
								if (String.IsNullOrWhiteSpace(form.DocNumber))
								{
									formsNotInZipFile.Add(form);
									continue;
								}

								var client = new WebClient();
								MemoryStream formMemoryStream;
								try
								{
									formMemoryStream = new MemoryStream(client.DownloadData(formUrl + form.DocID));
								}
								finally
								{
									client.Dispose();
								}

								var newEntry = new ZipEntry(string.Format("{0}-{1}.{2}", form.Name, form.DocID, form.FileType.ToLower() == "pdf" ? "pdf" : "doc"))
								{
									DateTime = DateTime.Now
								};

								zipStream.PutNextEntry(newEntry);
								StreamUtils.Copy(formMemoryStream, zipStream, new byte[4096]);
								formMemoryStream.Close();
								zipStream.CloseEntry();

								formsContainedInZipFile.Add(form);
							}
							catch
							{
								formsNotInZipFile.Add(form);
							}
						}

						zipStream.IsStreamOwner = false; // False stops the Close also Closing the underlying stream.
						zipStream.Close(); // Must finish the ZipOutputStream before using outputMemStream.

						outputMemStream.Position = 0;
						var filename = string.Format("{0}/{1}.zip", username, DateTime.Now.Ticks).Replace("RSUI\\", String.Empty);
						var path = HostingEnvironment.MapPath(string.Format("~/Zips/{0}", filename));

						if (!Directory.Exists(Path.GetDirectoryName(path))) Directory.CreateDirectory(Path.GetDirectoryName(path));
						using (var file = new FileStream(path, FileMode.Create, FileAccess.Write))
						{
							var bytes = new byte[outputMemStream.Length];
							outputMemStream.Read(bytes, 0, (int)outputMemStream.Length);
							file.Write(bytes, 0, bytes.Length);
							outputMemStream.Close();
						}

						var vDir = ConfigurationManager.AppSettings["appUrl"];
						vDir = String.IsNullOrEmpty(vDir) ? String.Empty : string.Format("{0}/", vDir);
						var context = GlobalHost.ConnectionManager.GetHubContext<ZipHub>();
						context.Clients.User(username).zipDownloadReady(new
						{
							Forms = formsContainedInZipFile,
							InvalidForms = formsNotInZipFile,
							Url = String.Format("http://{0}/{1}Zips/{2}", url.Authority, vDir, filename)
						});
					}
					catch (Exception e)
					{
						var context = GlobalHost.ConnectionManager.GetHubContext<ZipHub>();
						context.Clients.User(username).zipDownloadFailed("There was a problem with your download file.");
					}
				});
			}
			catch (Exception e)
			{
				var message = e.Message;
			}
			return Ok();
		}

		[HttpPost]
		[Route("email/docs")]
		public IHttpActionResult EmailDocs(EmailDocsModel model)
		{

			var pdfUrl = ConfigurationManager.AppSettings["FormsServiceUrl"];
			var username = User.Identity.Name;

			var url = HttpContext.Current.Request.Url;
			Task.Run(() =>
			{
				var formsContainedInZipFile = new List<Form>();
				var formsNotInZipFile = new List<Form>();
				var acctService = new AccountService(IoC.GetInstance<ISession>());


				try
				{
					var outputMemStream = new MemoryStream();

					// if (!User.Identity.IsAuthenticated) return BadRequest("User is not Authenticated");
					List<string> roles;
					var employee = acctService.GetAuthenticatedUser(username);

					using (
						var message = new MailMessage(
							new MailAddress(employee.EmailAddress, employee.FirstName + " " + employee.LastName),
							new MailAddress(model.To.Email, model.To.Name))
						{
							Subject = model.Subject,
							IsBodyHtml = true,
							Body = model.Body
						})
					{

						foreach (var form in model.Forms)
						{
							// If the no DocNumber, then a form would not be generated.
							if (String.IsNullOrWhiteSpace(form.DocNumber))
							{
								formsNotInZipFile.Add(form);
								continue;
							}

							var client = new WebClient();
							try
							{
								var pdfMemoryStream = new MemoryStream(client.DownloadData(pdfUrl + form.DocID));
								var data = new Attachment(new MemoryStream(pdfMemoryStream.ToArray()), form.Name + ".pdf");
								message.Attachments.Add(data);
								pdfMemoryStream.Close();
							}
							finally
							{
								client.Dispose();
								formsContainedInZipFile.Add(form);
							}
						}

						var smtp = new SmtpClient();
						smtp.Send(message);

						var context = GlobalHost.ConnectionManager.GetHubContext<ZipHub>();
						context.Clients.User(username).emailSent(new
						{
							Forms = formsContainedInZipFile,
							InvalidForms = formsNotInZipFile,
							model.To,
							model.Subject
						});

					}
				}
				catch (Exception e)
				{
					var context = GlobalHost.ConnectionManager.GetHubContext<ZipHub>();
                    Log.Error(e);
					context.Clients.User(username).emailFailed(new
						{
							Forms = formsContainedInZipFile,
							InvalidForms = formsNotInZipFile,
							model.To,
							model.Subject,
							Error = "Error Attaching Documents"
						});
				}
			});

			return Ok();
		}


		#endregion

	}
}
