-- [DATA]
-- Init
insert into configuration (TABLE_ID, DATA_LABEL, DATA_VALUE) values (1, 'FIRST_APPOINTMENT_TIME_START', '09:00');
insert into configuration (TABLE_ID, DATA_LABEL, DATA_VALUE) values (1, 'LAST_APPOINTMENT_TIME_START', '17:45');
insert into configuration (TABLE_ID, DATA_LABEL, DATA_VALUE) values (1, 'INTERVAL_OF_APPOINTMENT', '15');
insert into configuration (TABLE_ID, DATA_LABEL, DATA_VALUE) values (2, 'INTERVAL_OF_APPOINTMENT', '15');

insert into table_profile (TABLE_ID, TABLE_NAME) values (1, 'booking_appointment');
insert into table_profile (TABLE_ID, TABLE_NAME) values (2, 'timeoff');

insert into org_profile (ORG_ID, LABEL, NAME_ENG) values (1, 'OTC', 'Oi Tsuen Church');

insert into room_profile (ROOM_ID, LABEL, NAME_ENG) values (1, 'KIO', 'Kiosk');
insert into room_profile (ROOM_ID, LABEL, NAME_ENG) values (2, 'KOL', 'KOL');

insert into user_profile (USER_ID, LABEL, NAME_ENG) values (0, '/', '/');
insert into user_profile (USER_ID, LABEL, NAME_ENG) values (1, 'ABBIE_HUI', 'Abbie Hui');
insert into user_profile (USER_ID, LABEL, NAME_ENG) values (2, 'THOMAS_LEE', 'Thomas Lee');
insert into user_profile (USER_ID, LABEL, NAME_ENG) values (3, 'KEN_CHAN', 'Ken Chan');
insert into user_profile (USER_ID, LABEL, NAME_ENG) values (4, 'MAK_CHUN_CHI', 'Mak Chun Chi');
insert into user_profile (USER_ID, LABEL, NAME_ENG) values (5, 'LI_KA_SHING', 'Li Ka Shing');

Insert into room_registration (org_id, room_id) values (1, 1);

Insert into user_registration (org_id, user_id, is_admin) values (1, 0, true);
Insert into user_registration (org_id, user_id, is_admin) values (1, 1, true);
Insert into user_registration (org_id, user_id, is_admin) values (1, 2, true);
Insert into user_registration (org_id, user_id, is_admin) values (1, 3, true);
Insert into user_registration (org_id, user_id, is_admin) values (1, 4, false);
Insert into user_registration (org_id, user_id, is_admin) values (1, 5, false);


-- INSERT INTO `users` (`username`,`password`,`role`,`enabled`) VALUES ('admin','$2a$10$zxvEq8XzYEYtNjbkRsJEbukHeRx3XS6MDXHMu8cNuNsRfZJWwswDy','ROLE_ADMIN',1);

-- Checking
-- select * from configuration;
-- select * from table_profile;
-- select * from room_registration;
-- select * from user_registration;
