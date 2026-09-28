-- [DATABASE]
-- Clean creation
drop database booking_appointment_system;
-- CREATE database "booking_appointment_system"
CREATE database booking_appointment_system;
use booking_appointment_system;

-- [TABLE]
-- CREATE table "room_registration"
CREATE table room_registration (
	id int not null unique auto_increment,
	org_id int not null unique,
	room_id int not null unique,
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "user_registration"
CREATE table user_registration (
	id int not null unique auto_increment,
	org_id int not null,
	user_id int not null unique,
	is_admin bool not null,
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "user_profile"
CREATE table user_profile (
	id int not null unique auto_increment,
	user_id int not null,
        label varchar(100) not null unique,
	name_eng varchar(100) not null,
	name_chi varchar(100),
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "booking_appointment"
CREATE table booking_appointment (
	id int not null unique auto_increment,
	org_id int not null,
	room_id int not null,
	timeslot_start datetime not null,
	timeslot_end datetime not null,
	owner_id int not null,
	user_id int not null,
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "configuration"
CREATE table configuration (
	id int not null unique auto_increment,
	table_id int not null,
	data_label varchar(50) not null,
	data_value varchar(50),
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "table_profile"
CREATE table table_profile (
	id int not null unique auto_increment,
	table_id int not null unique,
	table_name varchar(50) not null unique,
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "timeoff"
CREATE table timeoff (
	id int not null unique auto_increment,
	org_id int not null,
	room_id int not null,
	timeslot_start datetime not null,
	timeslot_end datetime not null,
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "org_profile"
CREATE table org_profile (
	id int not null unique auto_increment,
	org_id int not null unique,
        label varchar(100) not null unique,
	name_eng varchar(100) not null,
	name_chi varchar(100),
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "room_profile"
CREATE table room_profile (
	id int not null unique auto_increment,
	room_id int not null unique,
        label varchar(100) not null unique,
	name_eng varchar(100) not null,
	name_chi varchar(100),
	created_datetime datetime not null default NOW(),
	created_by varchar(100) not null default 'SYSTEM',
	updated_datetime datetime not null default NOW(),
	updated_by varchar(100) not null default 'SYSTEM'
);
-- CREATE table "users"
CREATE TABLE `users` (
	`user_id` int(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(45) NOT NULL,
	`password` varchar(64) NOT NULL,
	`role` varchar(45) NOT NULL,
	`enabled` tinyint(4) DEFAULT NULL,
	`created_datetime` datetime not null default NOW(),
	`created_by` varchar(100) not null default 'SYSTEM',
	`updated_datetime` datetime not null default NOW(),
	`updated_by` varchar(100) not null default 'SYSTEM',
	PRIMARY KEY (`user_id`)
);
