-- Mysql client käynnistys komentoriviltä
--  mysql -u root -pMUNSALASANA
-- Windows: MySQL Client

DROP DATABASE IF EXISTS Journey;
CREATE DATABASE Journey;
USE Journey;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for daily nourishment
CREATE TABLE Nourishment (
    nour_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    food_allday VARCHAR(100),
    drinks VARCHAR(50),
    snacks_and_goodies TEXT,
    kcal_total DECIMAL(5,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for exercise details
CREATE TABLE Exercises (
   exer_id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   hrv INT,
   burned_kcal DECIMAL(5,2),
   exercise_type VARCHAR(255),
   notes TEXT,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for tracking injuries or illness
CREATE TABLE HealthConditions (
  health_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  injuries VARCHAR(100),
  illnesses VARCHAR(100),
  symptoms TEXT,
  duration_days INT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ALTER example, adding a new column to existing table
ALTER TABLE Users ADD COLUMN user_level VARCHAR(10) DEFAULT 'regular';

-------------------
-- Insert test data
-------------------

-- Inserting a single record, without specifying column names
INSERT INTO Users VALUES (1, 'johndoe', 'temp-pw-1', 'johndoe@example.com', '2024-01-02 10:00:00', 'regular');

-- Iserting multiple user rows at once (default values like created_at are inserted without need to specify them)
INSERT INTO Users (username, password, email, user_level) VALUES
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'regular'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'regular');

-- Example when FK constraint fails (if user_id 15 does not exist)
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (15, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00');

-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

  -- Insert mock data into Nourishment
INSERT INTO Nourishment (user_id, food_allday, drinks, snacks_and_goodies, kcal_total)
VALUES
  (1, 'Oatmeal, Chicken Salad, Rice & Vegetables', 'Water, Coffee', 'Chocolate Bar, Nuts', 2100.50),
  (2, 'Eggs & Toast, Pasta, Grilled Fish', 'Tea, Juice', 'Chips, Yogurt', 1800.75),
  (3, 'Smoothie, Sandwich, Steak', 'Water, Soda', 'Cookies, Almonds', 2500.00);

-- Insert mock data into Exercises
INSERT INTO Exercises (user_id, hrv, burned_kcal, exercise_type, notes)
VALUES
  (1, 75, 500.00, 'Running', 'Morning 5km run at the park'),
  (2, 65, 350.50, 'Cycling', 'Evening cycling for 30 minutes'),
  (3, 80, 600.25, 'Weight Training', 'Upper body strength training session');

-- Insert mock data into HealthConditions
INSERT INTO HealthConditions (user_id, injuries, illnesses, symptoms, duration_days, notes)
VALUES
  (1, 'Sprained Ankle', NULL, 'Swelling, Pain', 7, 'Injury from jogging, using ice packs'),
  (2, NULL, 'Flu', 'Fever, Cough, Fatigue', 5, 'Taking flu meds, resting at home'),
  (3, 'Wrist Strain', NULL, 'Sore wrist', 3, 'Mild pain, using a wrist brace');


------------
-- Queries
------------

-- Get all nourishment records
SELECT * FROM Nourishment;

-- Get nourishment details for a specific user
SELECT * FROM Nourishment WHERE user_id = 1;

-- Get all exercises performed in the last 7 days
SELECT * FROM Exercises WHERE created_at >= NOW() - INTERVAL 7 DAY;

-- Find users who burned more than 400 kcal in an exercise session
SELECT user_id, exercise_type, burned_kcal FROM Exercises WHERE burned_kcal > 400;

-- Retrieve all recorded health conditions
SELECT * FROM HealthConditions;

-- Find users who had illnesses in the past 30 days
SELECT user_id, illnesses, symptoms FROM HealthConditions
WHERE illnesses IS NOT NULL AND created_at >= NOW() - INTERVAL 30 DAY;


-----------------
-- Updating data
-----------------

-- Update the total calorie intake for a user
UPDATE Nourishment
SET kcal_total = 2200.75
WHERE user_id = 1 AND created_at = CURDATE();

-- Update exercise notes for a user’s session
UPDATE Exercises
SET notes = 'Pushed pace, improved endurance'
WHERE user_id = 1 AND exercise_type = 'Running';

-- Update symptoms for a specific health condition
UPDATE HealthConditions
SET symptoms = 'Swelling reduced, minor pain left'
WHERE user_id = 1 AND injuries = 'Sprained Ankle';

