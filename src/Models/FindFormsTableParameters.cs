using System.Collections.Generic;
using RSUI.FormsCatalog.Models;

namespace RSUI.FormsCatalog.Controllers.api
{
	public class FindFormsTableParameters : DataTableCriteria
	{
		public int DepartmentId { get; set; }
		public List<string> DocTypes { get; set; }
		public List<int> SubTypes { get; set; }
		public string Admitted { get; set; }
		public bool IncludeInactive { get; set; }
	}
}