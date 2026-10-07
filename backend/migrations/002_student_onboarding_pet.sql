SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'student_profiles'
    AND column_name = 'pet_type'
);
SET @migration_sql = IF(
  @column_exists = 0,
  'ALTER TABLE student_profiles ADD COLUMN pet_type ENUM(''egg'', ''cat'', ''dog'', ''fox'') NOT NULL DEFAULT ''egg'' AFTER current_streak',
  'SELECT 1'
);
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;
