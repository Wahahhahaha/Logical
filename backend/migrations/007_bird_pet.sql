-- Add the bird companion to existing installations without changing user data.
ALTER TABLE student_profiles MODIFY COLUMN pet_type ENUM('egg', 'cat', 'dog', 'fox', 'bird') NOT NULL DEFAULT 'egg';
