using System.Collections.Generic;
using RSUI.FormsCatalog.Models.Forms;

namespace RSUI.FormsCatalog.Controllers.api
{
	public class GetZipDownloadRequestModel
	{
		public List<Form> SelectedForms { get; set; }
	}
}