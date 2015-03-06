using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RSUI.FormsCatalog.Models.RuleBasedDocs
{
	public class DocTypeModel
	{
		public string DocType { get; set; }

		public string DocTypeId { get; set; }

		public string FileType { get; set; }
		public bool Selected { get; set; }

		public override bool Equals(object obj)
		{
			var that = obj as DocTypeModel;
			if (that == null)
				return false;

			return DocTypeId != null && DocTypeId.Equals(that.DocTypeId);
		}

		public override int GetHashCode()
		{
			return DocTypeId != null ? DocTypeId.GetHashCode() : 0;
		}

	}
}