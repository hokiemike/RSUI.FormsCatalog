using System.Collections.Generic;
using RSUI.FormsCatalog.Models.Forms;

namespace RSUI.FormsCatalog.Controllers.api
{
	public class EmailDocsModel
	{
		public EmailRecipient To { get; set; }
		public string Subject { get; set; }
		public string Body { get; set; }
		public List<Form> Forms { get; set; }
	}
}