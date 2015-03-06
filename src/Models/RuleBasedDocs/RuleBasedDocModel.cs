using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RSUI.FormsCatalog.Models.RuleBasedDocs
{
	public class RuleBasedDocModel
	{
		public int DocID { get; set; }
		public string DocNumber { get; set; }
		public string Edition { get; set; }
		public string Suffix { get; set; }
		public string Name { get; set; }
		public bool AllowMultiple { get; set; }
		public bool IsAdmitted { get; set; }
		public bool SystemManaged { get; set; }
		public string DocType { get; set; }
		public string DocTypeId { get; set; }
		public string EffectiveDate { get; set; }
		public string ExpirationDate { get; set; }
		public bool IsOptional { get; set; }
		public string Comment { get; set; }
		public List<RuleBasedDocSubTypeModel> SubTypes { get; set; }
		public string FileType { get; set; }
	}
}