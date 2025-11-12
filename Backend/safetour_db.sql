-- create database
CREATE DATABASE safetour CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE safetour;

-- users table (stores authenticated users)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  avatar VARCHAR(255),
  user_type ENUM('user','guide','admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- reports (ReportIssue)
CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  severity ENUM('low','medium','high') DEFAULT 'low',
  status ENUM('open','in_progress','resolved') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- guide requests (RequestGuide)
CREATE TABLE guide_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(150),
  email VARCHAR(255),
  phone VARCHAR(50),
  destination VARCHAR(255),
  start_date DATETIME,
  end_date DATETIME,
  group_size INT DEFAULT 1,
  language VARCHAR(50),
  special_requests TEXT,
  status ENUM('pending','accepted','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- contacts (Contact form submissions)
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  email VARCHAR(255),
  subject VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- optional: fences or saved locations (for user profile map)
CREATE TABLE fences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(150),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  radius_km DECIMAL(6,3) DEFAULT 0.5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- seed admin user (password: Password123!)
-- NOTE: password here must be hashed when using bcrypt in the backend. This is an example to insert later via the API or by hashing first.