using System.Collections.Generic;

namespace RSUI.FormsCatalog.Controllers.api
{
	public class FindGroupFormsParameters
	{
		public int Id { get; set; }
		public string SearchTerm { get; set; }
		public string DocType { get; set; }
		public List<string> DocTypes { get; set; }
		public List<int> SubTypes { get; set; }
	}
}