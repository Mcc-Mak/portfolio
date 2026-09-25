# [System]
sudo apt update
sudo apt upgrade
sudo apt install mysql-server mysql-client -y
sudo mysql_secure_installation
sudo mysql -uroot -pchange_me
sudo apt update
sudo apt install openjdk-8-jdk

# [MySQL 8.0]
CREATE DATABASE booking_appointment_system;
CREATE USER 'change_me'@'%' IDENTIFIED BY 'change_me';
GRANT ALL PRIVILEGES ON booking_appointment_system.* TO 'change_me'@'%';
FLUSH PRIVILEGES;
