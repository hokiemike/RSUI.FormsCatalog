#region

using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using log4net;
using NHibernate;
using NHibernate.Linq;
using RSUI.Common.Data.Entities;
using RSUI.Common.Legacy.Utils.Security;
using RSUI.Common.Utils.Log;
using RSUI.FormsCatalog.Models;
using RSUI.FormsCatalog.Models.ViewModels;

#endregion

namespace RSUI.FormsCatalog.Controllers.api
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : ApiController
    {
        private readonly ISession _session;
        private readonly IAccountService _accountService;
        protected static readonly ILog Log = LogManager.GetLogger(typeof(AccountsController));

        public AccountsController(ISession session, IAccountService accountService)
        {
            _session = session;
            _accountService = accountService;
        }

        [HttpGet]
        [Route("employee/{id}")]
        public IHttpActionResult LoadEmployee(int id)
        {
            try
            {
                var employee = _session.QueryOver<Employee>().Where(x => x.Id == id).SingleOrDefault() ?? new Employee();
                var employeeViewModel = Mapper.Map<EmployeeViewModel>(employee);
                return Ok(new ApiResponse { Success = true, Data = employeeViewModel });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        [HttpGet]
        [Route("sec/user/{id}")]
        public IHttpActionResult GetSecUser(int id)
        {
            try
            {
                var secUser = _session.Query<SecUser>().FirstOrDefault(x => x.EmployeeId == id) ?? new SecUser();
                return Ok(new ApiResponse { Success = true, Data = secUser });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        [HttpGet]
        [Route("auth/roles")]
        public IHttpActionResult GetRoles()
        {
            try
            {
                return Ok(new ApiResponse
                {
                    Success = true,
                    Data =
                    new
                    {
                        ViewEmployee = User.IsInRole("View Employee"),
                        EditEmployee = User.IsInRole("Edit Employee")
                    }
                });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        [HttpGet]
        [Route("auth/client")]
        public IHttpActionResult GetClientSideUser()
        {
            try
            {
                if (!User.Identity.IsAuthenticated)
                {
                    return BadRequest("User is not Authenticated");
                }

                var user = _accountService.GetAuthenticatedUser(User.Identity.Name); // ); //"rsuiex\\RLugo1"); //

                return Ok(new ApiResponse
              {
                  Success = true,
                  Data = new ClientSideUserViewModel
                  {
                      Id = user.Id,
                      UserProfile = user.UserProfile,
                      FirstName = user.FirstName,
                      LastName = user.LastName,
                      Email = user.EmailAddress,
                      Department = user.Department == null ? null : new DepartmentClientSideModel { Id = user.Department.Id, Name = user.Department.Description },
                      PrimaryTeam = user.PrimaryTeam == null ? new TeamClientSideModel() : new TeamClientSideModel { Id = user.PrimaryTeam.Id, Name = user.PrimaryTeam.Name },
                      Roles = user.Roles,
                      Departments = user.Departments,
                      ExternalUser = user.ExternalUser,
                      Expires = DateTime.Now.AddMinutes(30),
                      CanAccessNativeForms = user.Roles.Contains("Access Native Forms")
                  }
              });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return BadRequest(e.Message);
            }
        }

        #region Select2 Data Lookups

        [HttpPost]
        [Route("lookup/employee/types")]
        public IHttpActionResult GetEmployeeTypes(Select2Models.Input model)
        {
            try
            {
                var matches =
                  _session.Query<EmployeeType>()
                  .Where(x => x.Description.StartsWith(model.Term))
                  .Skip(model.SkipCount)
                  .Take(model.PageSize);
                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = new
                    {
                        more = _session.Query<EmployeeType>().Count(x => x.Description.StartsWith(model.Term)) < matches.Count(),
                        results = matches.Select(x => new Select2Models.DataItem
                        {
                            Id = x.Id,
                            Description = x.Description
                        }).ToList()
                    }
                });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        [HttpPost]
        [Route("lookup/employee/departments")]
        public IHttpActionResult GetEmployeeDepartments(Select2Models.Input model)
        {
            try
            {
                var matches =
                  _session.Query<Department>()
                  .Where(x => x.Description.StartsWith(model.Term) && x.IsActive)
                  .Skip(model.SkipCount)
                  .Take(model.PageSize);
                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = new
                    {
                        more = _session.Query<Department>().Count(x => x.Description.StartsWith(model.Term)) < matches.Count(),
                        results = matches.Select(x => new Select2Models.DataItem
                        {
                            Id = x.Id,
                            Description = x.Description
                        }).ToList()
                    }
                });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        [HttpPost]
        [Route("lookup/branches")]
        public IHttpActionResult GetBranches(Select2Models.Input model)
        {
            try
            {
                var matches =
                  _session.Query<Branch>()
                  .Where(x => x.Description.StartsWith(model.Term))
                  .Skip(model.SkipCount)
                  .Take(model.PageSize);
                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = new
                    {
                        more = _session.Query<Branch>().Count(x => x.Description.StartsWith(model.Term)) < matches.Count(),
                        results = matches.Select(x => new Select2Models.DataItem
                        {
                            Id = x.Id,
                            Description = x.Description
                        }).ToList()
                    }
                });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        [HttpPost]
        [Route("lookup/employee/status")]
        public IHttpActionResult GetEmployeeStatuses(Select2Models.Input model)
        {
            try
            {
                var matches = _session.Query<EmployeeStatus>()
                  .Where(x => x.Name.StartsWith(model.Term))
                  .Skip(model.SkipCount).Take(model.PageSize).ToList();

                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = new
                    {
                        more = _session.Query<EmployeeStatus>().Count(x => x.Name.StartsWith(model.Term)) < matches.Count(),
                        results = matches.Select(x => new Select2Models.DataItem
                        {
                            Id = x.Id,
                            Description = x.Description
                        }).ToList()
                    }
                });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        [HttpGet]
        [Route("lookup/employee/status")]
        public IHttpActionResult GetEmployeeStatuses()
        {
            try
            {
                var matches = _session.Query<EmployeeStatus>().ToList();

                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = new
                    {
                        more = _session.Query<EmployeeStatus>().Count() < matches.Count(),
                        results = matches.OrderBy(x => x.Id).Select(x => new Select2Models.DataItem
                        {
                            Id = x.Id,
                            Description = x.Description
                        }).ToList()
                    }
                });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        [HttpPost]
        [Route("lookup/orgunits")]
        public IHttpActionResult GetOrganizationalUnitsForSelect(Select2Models.Input model)
        {
            try
            {
                var matches =
                  _session.Query<OrganizationalUnit>()
                  .Where(x => x.Description.StartsWith(model.Term))
                  .Skip(model.SkipCount)
                  .Take(model.PageSize);

                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = new
                    {
                        more = _session.Query<OrganizationalUnit>().Count(x => x.Description.StartsWith(model.Term)) < matches.Count(),
                        results = matches.Select(x => new Select2Models.DataItem
                        {
                            Id = x.Id,
                            Description = x.Description
                        }).ToList()
                    }
                });
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e);
                return Ok(new ApiResponse { Success = false, Message = "Error, please try again later." });
            }
        }

        #endregion
    }
}