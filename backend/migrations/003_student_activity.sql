CREATE TABLE IF NOT EXISTS student_activities (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  activity_type ENUM('learning', 'checkin') NOT NULL,
  activity_key VARCHAR(160) NOT NULL,
  points INT UNSIGNED NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_activity_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_student_activity (user_id, activity_type, activity_key),
  INDEX idx_student_activity_date (user_id, created_at)
) ENGINE=InnoDB;
