using System;
using System.Linq;
using Omu.ValueInjecter;

namespace RSUI.FormsCatalog.Models
{
  public class IgnoreValueInjecter : LoopValueInjection
  {
    private readonly string[] _ignore;

    public IgnoreValueInjecter(string[] ignore)
    {
      _ignore = ignore;
    }

    protected override bool UseSourceProp(string sourcePropName)
    {
      return _ignore.Count(x => x == sourcePropName) == 0;
    }
  }

  public class StrToInt : ConventionInjection
  {
    protected override bool Match(ConventionInfo c)
    {
      return c.SourceProp.Name == c.TargetProp.Name &&
        c.SourceProp.Type == typeof(string) &&
        c.TargetProp.Type == typeof(int) &&
        c.SourceProp.Value != null &&
        c.SourceProp.Value.ToString() != String.Empty;
    }

    protected override object SetValue(ConventionInfo c)
    {
      return int.Parse(c.SourceProp.Value.ToString());
    }
  }

  public class IntToString : ConventionInjection
  {
    protected override bool Match(ConventionInfo c)
    {
      return c.SourceProp.Name == c.TargetProp.Name &&
        c.SourceProp.Type == typeof(int) &&
        c.TargetProp.Type == typeof(string) &&
        c.SourceProp.Value != null &&
        c.SourceProp.Value.ToString() != String.Empty;
    }

    protected override object SetValue(ConventionInfo c)
    {
      return c.SourceProp.Value.ToString();
    }
  }
}