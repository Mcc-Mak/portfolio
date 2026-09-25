drop function if exists countManyBooking;
DELIMITER //
create function countManyBooking (
	i_org_id int,
	i_room_id int,
	i_user_id int,
	i_timeslot_start varchar(50),
	i_timeslot_end varchar(50)
) returns int DETERMINISTIC
BEGIN
	-- [Guideline]
	-- Bypass 'i_org_id' by -1
	-- Bypass 'i_room_id' by -1
	-- Bypass 'i_user_id' by -1
	-- Bypass 'i_timeslot_start' by ''
	-- Bypass 'i_timeslot_end' by ''

	select count(1) into @result from booking_appointment A
		inner join org_profile B on B.org_id = A.org_id
		inner join room_profile C on C.room_id = A.room_id
		inner join user_profile D on D.user_id = A.owner_id
	where 1=1
		and (i_org_id = -1 or A.org_id = i_org_id)
		and (i_room_id = -1 or A.room_id = i_room_id)
		and (i_user_id = -1 or A.user_id = i_user_id)
		and (i_timeslot_start = '' or A.timeslot_start = convertStrToDate(i_timeslot_start))
		and (i_timeslot_end = '' or A.timeslot_end = convertStrToDate(i_timeslot_end));
	RETURN @result;
END; //
DELIMITER ;
