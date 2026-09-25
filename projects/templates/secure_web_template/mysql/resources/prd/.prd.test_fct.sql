use booking_appointment_system;

select getIdByProfileName('ORG', 'OTC') as 'ORG_ID';
select getIdByProfileName('ROOM', 'KOL') as 'ROOM_ID';
select getIdByProfileName('USER', 'LI_KA_SHING') as 'USER_ID';

select getAppointmentDatetime(0, true) as 'TIMESLOT_START';
select getAppointmentDatetime(7, false) as 'TIMESLOT_END';

select '====================================';
select
	count(1) as 'Reservation Count:'
from
	booking_appointment A
	inner join org_profile B on B.org_id = A.org_id
	inner join room_profile C on C.room_id = A.room_id
	inner join user_profile D on D.user_id = A.owner_id
where owner_id = 0;
select '====================================';
select addBooking('OTC', 'KIO', 'LI_KA_SHING', '2022-02-23 09:00', '2022-02-23 09:15') as 'Add booking (Return)';
select
	B.name_eng as 'Organization',
	C.name_eng as 'Room',
	A.timeslot_start,
	A.timeslot_end,
	D.name_eng as 'Owner',
        A.created_datetime,
        A.created_by,
        A.updated_datetime,
        A.updated_by
from
	booking_appointment A
	inner join org_profile B on B.org_id = A.org_id
	inner join room_profile C on C.room_id = A.room_id
	inner join user_profile D on D.user_id = A.owner_id
where owner_id = 5;
select '====================================';
select cancelBooking('OTC', 'KIO', 'THOMAS_LEE', '2022-02-23 09:00', '2022-02-23 09:15') as 'Cancel booking (Return)';
select
	B.name_eng as 'Organization',
	C.name_eng as 'Room',
	A.timeslot_start,
	A.timeslot_end,
	D.name_eng as 'Owner',
	A.created_datetime,
	A.created_by,
	A.updated_datetime,
	A.updated_by
from
	booking_appointment A
	inner join org_profile B on B.org_id = A.org_id
	inner join room_profile C on C.room_id = A.room_id
	inner join user_profile D on D.user_id = A.owner_id
where A.updated_by <> 'SYSTEM';
select '====================================';

select registerUser(
	'admin',
	'$2a$10$zxvEq8XzYEYtNjbkRsJEbukHeRx3XS6MDXHMu8cNuNsRfZJWwswDy',
	'ROLE_ADMIN'
) as 'User Registration';
select * from users;
