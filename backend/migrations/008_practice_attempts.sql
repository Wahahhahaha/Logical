CREATE TABLE IF NOT EXISTS student_practice_attempts (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  lesson_key VARCHAR(100) NOT NULL,
  stage_id INT UNSIGNED NULL,
  operation VARCHAR(30) NULL,
  correct_count INT UNSIGNED NOT NULL,
  total_count INT UNSIGNED NOT NULL,
  score INT UNSIGNED NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_attempt_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_attempt_user_date (user_id, created_at),
  INDEX idx_attempt_user_lesson (user_id, lesson_key)
) ENGINE=InnoDB;
