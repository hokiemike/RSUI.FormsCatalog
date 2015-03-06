using System.Collections.Generic;
using RSUI.FormsCatalog.Models.Forms;

namespace RSUI.FormsCatalog.Controllers.api
{
	public class DocTypeGroup
	{
		public string DocType { get; set; }
		public List<Form> Forms { get; set; }
	}
}