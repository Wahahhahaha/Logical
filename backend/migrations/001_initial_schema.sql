CREATE TABLE IF NOT EXISTS levels (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40) NOT NULL UNIQUE,
  description TEXT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role ENUM('teacher', 'student') NOT NULL,
  level_id INT UNSIGNED NULL,
  language ENUM('id-ID', 'en-US') NOT NULL DEFAULT 'id-ID',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_users_level FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE SET NULL,
  INDEX idx_users_role (role)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS classes (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  grade VARCHAR(30) NOT NULL,
  teacher_id CHAR(36) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE KEY uq_teacher_class_grade (teacher_id, name, grade),
  CONSTRAINT fk_classes_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS student_profiles (
  user_id CHAR(36) NOT NULL PRIMARY KEY,
  nis VARCHAR(40) NOT NULL UNIQUE,
  teacher_id CHAR(36) NOT NULL,
  class_id CHAR(36) NULL,
  grade VARCHAR(30) NOT NULL,
  initial_level_id INT UNSIGNED NOT NULL,
  current_exp INT UNSIGNED NOT NULL DEFAULT 0,
  current_streak INT UNSIGNED NOT NULL DEFAULT 0,
  pet_type ENUM('egg', 'cat', 'dog', 'fox') NOT NULL DEFAULT 'egg',
  pet_name VARCHAR(40) NULL,
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_student_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE RESTRICT,
  CONSTRAINT fk_student_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
  CONSTRAINT fk_student_level FOREIGN KEY (initial_level_id) REFERENCES levels(id) ON DELETE RESTRICT,
  INDEX idx_student_teacher (teacher_id),
  INDEX idx_student_class (class_id)
) ENGINE=InnoDB;

INSERT INTO levels (name, description) VALUES
  ('Basic', 'Foundational Mathematics skills'),
  ('Intermediate', 'Developing Mathematics skills'),
  ('Advanced', 'Advanced Mathematics reasoning')
ON DUPLICATE KEY UPDATE description = VALUES(description);
