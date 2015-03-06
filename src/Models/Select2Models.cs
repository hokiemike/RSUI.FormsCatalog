using System;
using Newtonsoft.Json;

namespace RSUI.FormsCatalog.Models
{
  public class Select2Models
  {
    public class DataItem
    {
      #region Public Properties

      [JsonProperty(PropertyName = "id")]
      public object Id { get; set; }

      [JsonProperty(PropertyName = "text")]
      public string Description { get; set; }

      #endregion
    }

    public class IntDataItem
    {
      #region Public Properties

      [JsonProperty(PropertyName = "id")]
      public int Id { get; set; }

      [JsonProperty(PropertyName = "text")]
      public string Description { get; set; }

      #endregion
    }

    public class Input
    {
      #region Public Properties

      public int Page { get; set; }
      public int PageSize { get; set; }

      [JsonIgnore]
      public int SkipCount { get { return (Page - 1) * PageSize; } }

      public string Term { get; set; }

      #endregion
    }

    public class InputWithDateRange
    {
      #region Public Properties

      public int Page { get; set; }
      public int PageSize { get; set; }

      [JsonIgnore]
      public int SkipCount { get { return (Page - 1) * PageSize; } }

      public string Term { get; set; }

      public DateTime StartDate { get; set; }
      public DateTime EndDate { get; set; }

      #endregion
    }

    public class Response
    {
      #region Public Properties

      [JsonProperty(PropertyName = "more")]
      public bool HasMore { get; set; }

      [JsonProperty(PropertyName = "results")]
      public object Results { get; set; }

      #endregion
    }
  }
}