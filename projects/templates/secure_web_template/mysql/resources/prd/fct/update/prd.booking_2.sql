drop function if exists cancelBooking;
DELIMITER //
create function cancelBooking (
	i_org_label varchar(50),
	i_room_label varchar(50),
	i_user_label varchar(50),
	i_timeslot_start varchar(50),
 	i_timeslot_end varchar(50)
) returns int DETERMINISTIC
BEGIN
	set @i_timeslot_start = convertStrToDate(i_timeslot_start);
	set @i_timeslot_end = convertStrToDate(i_timeslot_end);

	set @i_org_id = getIdByProfileName('ORG', i_org_label);
	set @i_room_id = getIdByProfileName('ROOM', i_room_label);
	set @i_user_id = getIdByProfileName('USER', i_user_label);

	-- Return '-1' if the operator is not administrator or the user of booking
	-- Return '-2' if the reservarion is not 2 hours or more in advance
	-- Return '1' when successfully booked the appointment

	-- update only if the operator is administrator or the user of booking
	if not exists(select org_id from booking_appointment where org_id = @i_org_id and room_id = @i_room_id and (user_id = @i_user_id or exists(select is_admin from user_registration where org_id = @i_org_id and user_id = @i_user_id and is_admin = 1)) and timeslot_start = @i_timeslot_start and timeslot_end = @i_timeslot_end) then
		RETURN -1;
	end if;

	-- update only if reservarion 2 hours or more in advance
	if @i_timeslot_start < NOW() + INTERVAL 2 HOUR then
		RETURN -2;
	end if;

	-- update the booking now!
	set @user_id_reserved = 0;
	update booking_appointment
		set owner_id = @user_id_reserved
			, user_id = @user_id_reserved
			, updated_datetime = NOW()
			, updated_by = (
				select name_eng from user_profile where org_id = @i_org_id and user_id = @i_user_id
			)
	where 1=1
		and org_id = @i_org_id
		and room_id = @i_room_id
		and timeslot_start = @i_timeslot_start
		and timeslot_end  = @i_timeslot_end;
	RETURN 1;
END //
DELIMITER ;
