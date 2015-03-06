using System.Collections.Generic;
using RSUI.Common.Data.Entities;
using RSUI.FormsCatalog.Controllers.api;

namespace RSUI.FormsCatalog.Models
{
	public class AuthenticatedUserInfo
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string UserProfile { get; set; }
		public string LastName { get; set; }
		public string EmailAddress { get; set; }
		public Department Department { get; set; }
		public Team PrimaryTeam { get; set; }
		public bool ExternalUser { get; set; }
		public List<string> Roles { get; set; }
		public List<UserDepartment> Departments { get; set; }
	}
}