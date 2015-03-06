using System.Collections.Generic;
using RSUI.FormsCatalog.Models;

namespace RSUI.FormsCatalog.Controllers.api
{
	public class DepartmentFormsLookupSelectRequest : Select2Models.Input
	{
		public int DepartmentId { get; set; }
		public List<string> DocTypes { get; set; }
		public List<int> SubTypes { get; set; }
	}
}