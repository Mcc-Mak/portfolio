drop procedure if exists sp_ReserveTimeslot;
DELIMITER //
create procedure sp_ReserveTimeslot (
	i_org_id int,
	i_room_id int
)
BEGIN
        -- [Constant]
	set @SYSTEM_USER_ID = 0;
        set @year_symbol = '%Y';
        set @month_symbol = '%m';
        set @day_symbol = '%d';
	-- set @date_format1_symbol = @year_symbol + '-' + @month_symbol + '-' + @day_symbol;
        set @hour_symbol = '%H';
        set @minute_symbol = '%i';
        set @dayname_symbol = '%a';

        -- [Configuration]
        select DATA_VALUE into @interval_of_appointment from configuration where table_id = 1 and data_label = 'INTERVAL_OF_APPOINTMENT';
        select DATA_VALUE into @first_appointment_time_start from configuration where table_id = 1 and data_label = 'FIRST_APPOINTMENT_TIME_START';
        select DATA_VALUE into @last_appointment_time_start from configuration where table_id = 1 and data_label = 'LAST_APPOINTMENT_TIME_START';

	-- [Now]
	set @now = SYSDATE();

	set @datetime_cur_$datetime = getAppointmentDatetime(0, true);
	set @datetime_end_$datetime = getAppointmentDatetime(7, false);

	select @datetime_cur_$datetime, @datetime_end_$datetime;

	-- [Deletion of duplicated]
	delete from booking_appointment where user_id = 0 and timeslot_start >= @datetime_cur_$datetime and timeslot_end <= @datetime_end_$datetime;

	-- insert only if datetime within N-days
	while @datetime_cur_$datetime <= @datetime_end_$datetime do
		-- insert only if time within office-hour
		if DATE_FORMAT(@datetime_cur_$datetime,CONCAT(@hour_symbol,':',@minute_symbol)) >= DATE_FORMAT(@now,@first_appointment_time_start) and DATE_FORMAT(@datetime_cur_$datetime,CONCAT(@hour_symbol,':',@minute_symbol)) <= DATE_FORMAT(@now,@last_appointment_time_start) then
			-- insert only if current timeslot not yet inserted
			if not exists(select org_id from booking_appointment where org_id = i_org_id and room_id = i_room_id and timeslot_start = @datetime_cur_$datetime and timeslot_end = @datetime_cur_$datetime + INTERVAL @interval_of_appointment MINUTE) then
				set @dayname_cur_$string = DATE_FORMAT(@datetime_cur_$datetime, @dayname_symbol);
				-- insert only if dayname not equivalent to 'Saturday' or 'Sunday'
				if @dayname_cur_$string not in ('Sun', 'Sat') then
					insert into booking_appointment (org_id, room_id, timeslot_start, timeslot_end, owner_id, user_id)
					values (
						i_org_id,
						i_room_id,
						@datetime_cur_$datetime,
						@datetime_cur_$datetime + INTERVAL @interval_of_appointment MINUTE,
						@SYSTEM_USER_ID,
						@SYSTEM_USER_ID
					);
				end if;
			end if;
		end if;
		set @datetime_cur_$datetime = @datetime_cur_$datetime + INTERVAL @interval_of_appointment MINUTE;
        end while;
END //
DELIMITER ;
