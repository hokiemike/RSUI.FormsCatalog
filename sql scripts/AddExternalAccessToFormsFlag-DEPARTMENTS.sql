if not exists (select
                     column_name
               from
                     INFORMATION_SCHEMA.columns
               where
                     table_name = 'DEPARTMENTS'
                     and column_name = 'ExternalAccessToForms')
begin
    
	ALTER TABLE dbo.DEPARTMENTS ADD
	   ExternalAccessToForms bit NOT NULL DEFAULT 0

	

END
GO

UPDATE DEPARTMENTS SET ExternalAccessToForms=1 WHERE DEPARTMENT_NUMBER=10006
GO