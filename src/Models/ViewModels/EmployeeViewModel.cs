#region

using System;
using System.Collections.Generic;
using RSUI.Common.Data.Utils;
using RSUI.Common.Legacy.Data.Domain;
using RSUI.FormsCatalog.Models.Employee;
using SecUser = RSUI.Common.Data.Entities.SecUser;

#endregion

namespace RSUI.FormsCatalog.Models.ViewModels
{
  public class EmployeeViewModel
  {
    #region Private Fields

    private int _defaultUnderwriterId = int.MinValue;
    private int _departmentNumber = int.MinValue;
    private int _employeeTypeKey = int.MinValue;
    private double _paymentAuthority = double.MinValue;
    private SecUser _secUser;

    public EmployeeViewModel()
    {
      Extension = int.MinValue;
      ActiveCode = char.MinValue;
    }

    #endregion

    #region Public Properties

    [KeyProperty]
    public int Id { get; set; }

    public string UserProfile { get; set; }

    public string LastName { get; set; }

    [Obsolete("This property will be removed in future versions.  Use IsActive property.", false)]
    public char ActiveCode { get; set; }

    public bool IsActive
    {
      get { return Converter.ActiveInactiveToBool(ActiveCode); }
      set { ActiveCode = Converter.BoolToActiveInactive(value); }
    }

    public int Extension { get; set; }

    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string Prefix { get; set; }

    public int BranchNumber { get; set; }

    public int DepartmentNumber
    {
      get { return _departmentNumber; }

      set { _departmentNumber = value; }
    }

    public string EmailAddress { get; set; }

    public string FaxNumber { get; set; }

    public double PaymentAuthority
    {
      get { return _paymentAuthority; }

      set { _paymentAuthority = value; }
    }

    public int EmployeeTypeKey
    {
      get { return _employeeTypeKey; }

      set { _employeeTypeKey = value; }
    }

    public bool IsExempt { get; set; }

    public bool IsOnPayroll { get; set; }

    public int DefaultUnderwriterId
    {
      get { return _defaultUnderwriterId; }

      set { _defaultUnderwriterId = value; }
    }

    public bool IsExecutive { get; set; }

    public string Signature { get; set; }
    public bool? AllowCompressed { get; set; }
    public DateTime? CompressedStatusDate { get; set; }
    public bool WorkOtherDepartmentTasks { get; set; }
    public double IndemnityReserveAuthority { get; set; }
    public double ExpenseReserveAuthority { get; set; }
    public string Initials { get; set; }
    public string Address1 { get; set; }
    public string Address2 { get; set; }
    public string City { get; set; }
    public string StateAbbreviation { get; set; }
    public string ZipCode { get; set; }
    public int? DefaultAssistant { get; set; }

    public bool IsFireWarden { get; set; }
    public bool IsFirstResponder { get; set; }
    public bool IsNotaryPublic { get; set; }
    public bool IsSharePointPowerUser { get; set; }
    public int HrManagerId { get; set; }


    public Select2Models.DataItem Branch { get; set; }
    public Select2Models.DataItem BranchFloor { get; set; }
    public Select2Models.DataItem Department { get; set; }
    public Select2Models.DataItem EmployeeType { get; set; }
    public Select2Models.DataItem Underwriter { get; set; }
    public Select2Models.DataItem HrManager { get; set; }
    public Select2Models.DataItem PrimaryTeam { get; set; }

    public List<Select2Models.DataItem> PtoCoordinators { get; set; }
    public List<Select2Models.DataItem> TimeCardApprovers { get; set; }
    public List<Select2Models.DataItem> OrganizationalUnits { get; set; }
    public List<Select2Models.DataItem> OtherEmployeeDepartments { get; set; }
    public List<Select2Models.DataItem> OtherEmployeeTeams { get; set; }
    //public List<EmployeeCalendarYearViewModel> PtoForCalendarYears { get; set; }
    public List<EmployeeStatusModel> EmployeeStatuses { get; set; }

    public string PhoneDigits { get { return Prefix + Extension; } }

    public bool IsTeamLeader { get; set; }
    public TeamLeaderQueryResponse CurrentTeamLeader { get; set; }

    #endregion
  }
}