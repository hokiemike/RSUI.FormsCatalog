using System.Collections.Generic;

namespace RSUI.FormsCatalog.Models
{
  public class ApiResponse
  {
    public ApiResponse()
    {
      Errors = new HashSet<string>();
    }
    public bool Success { get; set; }
    public bool FatalError { get; set; }
    public object Data { get; set; }
    public string Message { get; set; }
    public ISet<string> Errors { get; set; }
  }
}