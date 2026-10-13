SET @column_exists = (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'users'
    AND column_name = 'photo_url'
);
SET @migration_sql = IF(
  @column_exists = 0,
  'ALTER TABLE users ADD COLUMN photo_url VARCHAR(500) NULL AFTER language',
  'SELECT 1'
);
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;
