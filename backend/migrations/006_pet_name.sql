SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'student_profiles'
    AND column_name = 'pet_name'
);
SET @migration_sql = IF(
  @column_exists = 0,
  'ALTER TABLE student_profiles ADD COLUMN pet_name VARCHAR(40) NULL AFTER pet_type',
  'SELECT 1'
);
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;