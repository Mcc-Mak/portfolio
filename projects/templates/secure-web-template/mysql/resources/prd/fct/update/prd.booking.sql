drop function if exists addBooking;
DELIMITER //
create function addBooking (
	i_org_label varchar(100),
	i_room_label varchar(100),
	i_user_label varchar(100),
	i_timeslot_start varchar(50),
 	i_timeslot_end varchar(50)
) returns int DETERMINISTIC
BEGIN
	set @i_timeslot_start = convertStrToDate(i_timeslot_start);
	set @i_timeslot_end = convertStrToDate(i_timeslot_end);

        set @i_org_id = getIdByProfileName('ORG', i_org_label);
        set @i_room_id = getIdByProfileName('ROOM', i_room_label);
        set @i_user_id = getIdByProfileName('USER', i_user_label);

	-- Return '-1' if the user is more than 3 bookings in this organization coming N-days
	-- Return '-2' if the timeslot is reserved
	-- Return '-3' if the reservarion is not 2 hours or more in advance
	-- Return '1' when successfully booked the appointment

	-- update only if the user is less than 3 bookings in this organization coming N-days
	set @n_days_timeslot_start = getAppointmentDatetime(0, true);
	set @n_days_timeslot_end = getAppointmentDatetime(7, false);
	set @countUserBookingWithinNDays = countOneBooking(@i_org_id, -1, @i_user_id, convertDateToStr(@n_days_timeslot_start, 1, ''), convertDateToStr(@n_days_timeslot_end, 1, ''));
	if @countUserBookingWithinNDays >= 3 then
		RETURN -1;
	end if;

	-- update only if the timeslot is not reserved
	set @user_id_reserved = 0;
	if countManyBooking(@i_org_id, @i_room_id, @user_id_reserved, i_timeslot_start, i_timeslot_end) = 0 then
		RETURN -2;
	end if;

	-- update only if reservarion 2 hours or more in advance
	if @i_timeslot_start < NOW() + INTERVAL 2 HOUR then
		RETURN -3;
	end if;

	-- update the booking now!
	update booking_appointment
		set owner_id = @i_user_id
			, user_id = @i_user_id
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
