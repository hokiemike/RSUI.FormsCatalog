namespace RSUI.FormsCatalog.Models.Employee
{
  public class EmployeeStatusModel
  {
    public int Id { get; set; }
    public string EffectiveDate { get; set; }
    public int EmployeeId { get; set; }
    public int EmployeeStatusId { get; set; }
    public string Description { get; set; }
  }
}