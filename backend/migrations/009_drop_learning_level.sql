-- Remove the "Initial learning level" feature from existing installations.
-- Idempotent: safe to run repeatedly (migrate.js runs every migration file on each run).

SET @fk_users_level = (
  SELECT COUNT(*) FROM information_schema.table_constraints
  WHERE table_schema = DATABASE() AND table_name = 'users'
    AND constraint_name = 'fk_users_level' AND constraint_type = 'FOREIGN KEY'
);
SET @migration_sql = IF(@fk_users_level > 0, 'ALTER TABLE users DROP FOREIGN KEY fk_users_level', 'SELECT 1');
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;

SET @users_level_column = (
  SELECT COUNT(*) FROM information_schema.columns
  WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'level_id'
);
SET @migration_sql = IF(@users_level_column > 0, 'ALTER TABLE users DROP COLUMN level_id', 'SELECT 1');
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;

SET @fk_student_level = (
  SELECT COUNT(*) FROM information_schema.table_constraints
  WHERE table_schema = DATABASE() AND table_name = 'student_profiles'
    AND constraint_name = 'fk_student_level' AND constraint_type = 'FOREIGN KEY'
);
SET @migration_sql = IF(@fk_student_level > 0, 'ALTER TABLE student_profiles DROP FOREIGN KEY fk_student_level', 'SELECT 1');
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;

SET @initial_level_column = (
  SELECT COUNT(*) FROM information_schema.columns
  WHERE table_schema = DATABASE() AND table_name = 'student_profiles' AND column_name = 'initial_level_id'
);
SET @migration_sql = IF(@initial_level_column > 0, 'ALTER TABLE student_profiles DROP COLUMN initial_level_id', 'SELECT 1');
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;

DROP TABLE IF EXISTS levels;
