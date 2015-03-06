using NHibernate;
using NHibernate.Linq;
using NHibernate.Transform;
using RSUI.Common.Data.Entities;
using RSUI.FormsCatalog.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RSUI.FormsCatalog.Controllers.api
{
	public interface IAccountService
	{
		AuthenticatedUserInfo GetAuthenticatedUser(string username);
	}

	public class AccountService : IAccountService
	{
		private readonly ISession _session;

		public AccountService(ISession session)
		{
			_session = session;
		}


		public AuthenticatedUserInfo GetAuthenticatedUser(string username)
		{

			if (username.ToUpper().StartsWith("RSUIEX"))
			{
				var person = _session.Query<People>().FirstOrDefault(x => x.UserName == username);
				if (person == null) return null;

				return new AuthenticatedUserInfo
				{
					Id = person.Id,
					FirstName = person.FirstName,
					LastName = person.LastName,
					ExternalUser = true,
					UserProfile = person.UserName,
					Roles = new List<string>(),
					Departments = GetPeopleDepartments(person.UserName)
				};
			}
			else
			{
				var atl = username.Substring(username.IndexOf("\\", StringComparison.Ordinal) + 1);
				var employee = _session.Query<Employee>().FirstOrDefault(x => x.UserProfile == atl);
				if (employee == null) return null;

				var roles = _session.CreateSQLQuery("exec usp_sec_GetRolesForUser @UserName=:UserName")
					.AddEntity(typeof(UserRole))
					.SetParameter("UserName", atl)
					.List<UserRole>().Select(x => x.RoleName).ToList();

				return new AuthenticatedUserInfo
				{
					Id = employee.Id,
					FirstName = employee.FirstName,
					LastName = employee.LastName,
					ExternalUser = false,
					UserProfile = employee.UserProfile,
					EmailAddress = employee.EmailAddress,
					Department = employee.Department,
					PrimaryTeam = employee.PrimaryTeam,
					Roles = roles,
					Departments = new List<UserDepartment>()
				};
			}
		}

		public List<UserDepartment> GetPeopleDepartments(string username)
		{
			return _session.CreateSQLQuery(@"SELECT DISTINCT d.DEPARTMENT_NUMBER AS Id, d.DEPARTMENT_DESCRIPTION AS Name
FROM dbo.PEOPLE AS p
JOIN dbo.PEOPLE_LOCATION_XREF AS plx ON plx.PEOPLE_SKEY = p.PEOPLE_SKEY
JOIN dbo.LOCATION_XREF AS lx ON lx.LOCATION_XREF_SKEY = plx.LOCATION_XREF_SKEY
JOIN dbo.DEPARTMENTS AS d ON d.DEPARTMENT_NUMBER = lx.DEPARTMENT_NUMBER
WHERE p.ACTIVE_CODE = 'A'
AND plx.ACTIVE_CODE = 'A'
AND lx.ACTIVE_CODE = 'A'
AND d.IsActive = 1
AND d.ExternalAccessToForms = 1
AND p.EXTERNAL_LOGIN = '" + username + "'")
				.SetResultTransformer(Transformers.AliasToBean(typeof (UserDepartment)))
				.List<UserDepartment>().ToList();
		} 
	}
}