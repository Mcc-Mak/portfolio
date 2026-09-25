-- [MySQL 8.0]
-- ### IMPORTANT ###
-- THE FOLLOWINGS MUST BE CREATED MANUALLY ONCE AT THE BEGINNING
CREATE DATABASE booking_appointment_system;
CREATE USER 'change_me'@'%' IDENTIFIED BY 'change_me';
GRANT ALL PRIVILEGES ON booking_appointment_system.* TO 'change_me'@'%';
FLUSH PRIVILEGES;
