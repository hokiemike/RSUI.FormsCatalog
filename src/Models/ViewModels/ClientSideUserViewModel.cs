using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RSUI.Common.Data.Constants;

namespace RSUI.FormsCatalog.Models.ViewModels
{
  public class ClientSideUserViewModel
  {
		public ClientSideUserViewModel() { Roles = new List<string>(); }

		public int Id { get; set; }
		public string UserProfile { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string FullName { get { return string.Format("{0} {1}", FirstName, LastName); } }
		public string Email { get; set; }
		public DepartmentClientSideModel Department { get; set; }
		public TeamClientSideModel PrimaryTeam { get; set; }
		public DateTime Expires { get; set; }
		public List<string> Roles { get; set; }
	  public List<UserDepartment> Departments { get; set; }
	  public bool ExternalUser { get; set; }
	  public bool CanAccessNativeForms { get; set; }
  }

  public class TeamClientSideModel
  {
	public int Id { get; set; }
	public string Name { get; set; }
  }

  public class DepartmentClientSideModel
  {
	public int Id { get; set; }
	public string Name { get; set; }
  }
}