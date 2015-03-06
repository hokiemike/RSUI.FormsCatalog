using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentNHibernate.MappingModel.ClassBased;

namespace RSUI.FormsCatalog.Models.Forms
{
	public class Form
	{
		public bool AllowMultiple { get; set; }
		public int DocID { get; set; }
		public string DocType { get; set; }
		public string DocNumber { get; set; }
		public string Edition { get; set; }
		public DateTime EffectiveDate { get; set; }
		public DateTime? ExpirationDate { get; set; }
		public string Name { get; set; }
		public List<SubType> SubTypes { get; set; }
		public string Suffix { get; set; }
		public bool SystemManaged { get; set; }
		public string Comment { get; set; }
		public bool IsAdmitted { get; set; }
		public bool IsInactive { get; set; }
		public string FileType { get; set; }
	}
	public class FormDto
	{
		public bool AllowMultiple { get; set; }
		public int DocID { get; set; }
		public string DocType { get; set; }
		public string DocNumber { get; set; }
		public string Edition { get; set; }
		public DateTime EffectiveDate { get; set; }
		public DateTime? ExpirationDate { get; set; }
		public string Name { get; set; }
		public List<SubType> SubTypes { get { return SubTypesPiped == null ? new List<SubType>() : SubTypesPiped.Split('|').Select(x => new SubType { Description = x }).ToList(); } }
		public string SubTypesPiped { get; set; }
		public string Suffix { get; set; }
		public bool SystemManaged { get; set; }
		public string Comment { get; set; }
		public bool IsAdmitted { get; set; }
		public bool IsInactive { get { return Inactive != 0; } }
		public int Inactive { get; set; }
		public string FileType { get; set; }
	}

	public class SubType
	{
		public int Id { get; set; }
		public string Description { get; set; }
	}

	public class FormLookupResponse
	{
		public string NextPageUrl { get; set; }
		public string PrevPageUrl { get; set; }
		public List<Form> Results { get; set; }
		public int TotalCount { get; set; }
		public string TotalPage { get; set; }
	}

	public class AllFormsLookupResponse
	{
		public List<Form> Results { get; set; }
		public int TotalCount { get; set; }
	}
}