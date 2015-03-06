namespace RSUI.FormsCatalog.Models.RuleBasedDocs
{
	public class SubTypeModel
	{
		public int Id { get; set; }
		public string Desc { get; set; }
		public bool Selected { get; set; }

		public override bool Equals(object obj)
		{
			return (obj != null && obj.Equals(Id));
		}

		public override int GetHashCode()
		{
			return Id.GetHashCode();
		}
	}
}