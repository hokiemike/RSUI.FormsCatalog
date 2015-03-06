using Newtonsoft.Json;

namespace RSUI.FormsCatalog.Models
{
	public class UserDepartment
	{
		[JsonProperty(PropertyName = "id")]
		public int Id { get; set; }
		[JsonProperty(PropertyName = "text")]
		public string Name { get; set; }
	}
}