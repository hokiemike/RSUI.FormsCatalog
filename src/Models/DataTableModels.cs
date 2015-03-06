using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RSUI.FormsCatalog.Models
{
  public class DataGridResult<TEntity>
  {
	public DataGridResult()
	{
	  Data = new HashSet<TEntity>();
	}

	public DataGridResult(ICollection<TEntity> data, int totalRecords, int displayedRecords)
	{
	  Data = data;
	  TotalRecords = totalRecords;
	  DisplayedRecords = displayedRecords;
	}

	public ICollection<TEntity> Data { get; set; }
	public int TotalRecords { get; set; }
	public int DisplayedRecords { get; set; }
  }

  public class DataGridResult<TEntity, TTEntity>
  {
	public DataGridResult()
	{
	  Data = new HashSet<TEntity>();
	  DataTwo = new HashSet<TTEntity>();
	}

	public DataGridResult(ICollection<TEntity> data, int totalRecords, int displayedRecords)
	{
	  Data = data;
	  DataTwo = new HashSet<TTEntity>();
	  TotalRecords = totalRecords;
	  DisplayedRecords = displayedRecords;
	}

	public DataGridResult(ICollection<TEntity> data, ICollection<TTEntity> dataTwo, int totalRecords, int displayedRecords)
	{
	  Data = data;
	  DataTwo = dataTwo;
	  TotalRecords = totalRecords;
	  DisplayedRecords = displayedRecords;
	}

	public ICollection<TEntity> Data { get; set; }
	public ICollection<TTEntity> DataTwo { get; set; }
	public int TotalRecords { get; set; }
	public int DisplayedRecords { get; set; }
  }

  public class DataGridResult<TEntity, TSEntity, TTEntity>
  {
	public DataGridResult()
	{
	  Data = new HashSet<TEntity>();
	  DataTwo = new HashSet<TSEntity>();
	  DataThree = new HashSet<TTEntity>();
	}

	public DataGridResult(ICollection<TEntity> data, int totalRecords, int displayedRecords)
	{
	  Data = data;
	  DataTwo = new HashSet<TSEntity>();
	  DataThree = new HashSet<TTEntity>();
	  TotalRecords = totalRecords;
	  DisplayedRecords = displayedRecords;
	}

	public DataGridResult(ICollection<TEntity> data, ICollection<TSEntity> dataTwo, int totalRecords, int displayedRecords)
	{
	  Data = data;
	  DataTwo = dataTwo;
	  DataThree = new HashSet<TTEntity>();
	  TotalRecords = totalRecords;
	  DisplayedRecords = displayedRecords;
	}

	public DataGridResult(ICollection<TEntity> data, ICollection<TSEntity> dataTwo, ICollection<TTEntity> dataThree, int totalRecords, int displayedRecords)
	{
	  Data = data;
	  DataTwo = dataTwo;
	  DataThree = dataThree;
	  TotalRecords = totalRecords;
	  DisplayedRecords = displayedRecords;
	}

	public ICollection<TEntity> Data { get; set; }
	public ICollection<TSEntity> DataTwo { get; set; }
	public ICollection<TTEntity> DataThree
	{ get; set; }
	public int TotalRecords { get; set; }
	public int DisplayedRecords { get; set; }
  }

  public class DataTableColumnCriteria
  {
	public string ColumnName { get; set; }
	public bool IsSearchable { get; set; }
	public bool IsSorted { get; set; }
	public string SearchText { get; set; }
	public int SortOrder { get; set; }
  }

  public class DataTableCriteria
  {
	public int RecordsToTake { get; set; }
	public int RecordsToSkip { get; set; }
	public string GlobalSearchText { get; set; }

	public ICollection<DataTableColumnCriteria> Columns { get; set; }
  }

}