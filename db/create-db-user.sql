-- User creation expample, replace 'user' and 'password'
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `Journey`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
