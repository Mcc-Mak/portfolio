-- [Function]
-- ///////////////////////////////////////////////////////////////
-- 1. convertDateToStr()
drop function if exists convertDateToStr;
DELIMITER //
create function convertDateToStr (
	data datetime,
	pattern int,
	supplement varchar(50)
) returns varchar(50) DETERMINISTIC
BEGIN
	-- [Constant]
	-- 	Seperator
	set @HYTHAN_$string = '-';
	set @COLON_$string = ':';
	-- 	Date
	set @date_format_1_$string = CONCAT_WS(@HYTHAN_$string, '%Y','%m','%d');
	-- 	Time
	set @time_format_1_$string = CONCAT_WS(@COLON_$string, '%H', '%i');
	-- 	(Short-cut) Datetime
	if pattern = 1 then
		set @datetime_format_1_$string = CONCAT_WS(' ', @date_format_1_$string, @time_format_1_$string);
	elseif pattern = 2 then
		set @datetime_format_1_$string = CONCAT(@date_format_1_$string, ' ', supplement);
	elseif pattern = 3 then
		set @datetime_format_1_$string = CONCAT(supplement, ' ', @time_format_1_$string);
	end if;
	RETURN DATE_FORMAT(data, @datetime_format_1_$string);
END; //
-- ///////////////////////////////////////////////////////////////
-- 2. convertStrToDate()
drop function if exists convertStrToDate;
create function convertStrToDate (
	data varchar(50)
) returns datetime DETERMINISTIC
BEGIN
	-- [Constant]
	-- 	Seperator
	set @HYTHAN_$string = '-';
	set @COLON_$string = ':';
	-- 	Date
	set @date_format_1_$string = CONCAT_WS(@HYTHAN_$string, '%Y','%m','%d');
	-- 	Time
	set @time_format_1_$string = CONCAT_WS(@COLON_$string, '%H', '%i');
	-- 	(Short-cut) Datetime
	set @datetime_format_1_$string = CONCAT_WS(' ', @date_format_1_$string, @time_format_1_$string);
	RETURN STR_TO_DATE(data, @datetime_format_1_$string);
END; //
-- ///////////////////////////////////////////////////////////////
-- 3. getAppointmentDatetime()
drop function if exists getAppointmentDatetime;
create function getAppointmentDatetime (
	days_offset int,
        is_start boolean
) returns datetime DETERMINISTIC
BEGIN
      -- [Configuration]
      select DATA_VALUE into @interval_of_appointment from configuration where table_id = 1 and data_label = 'INTERVAL_OF_APPOINTMENT';
      select DATA_VALUE into @first_appointment_time_start from configuration where table_id = 1 and data_label = 'FIRST_APPOINTMENT_TIME_START';
      select DATA_VALUE into @last_appointment_time_start from configuration where table_id = 1 and data_label = 'LAST_APPOINTMENT_TIME_START';

      -- [Now]
      set @now = SYSDATE();

      -- Change the time
      set @appointment_time_start_$string = convertDateToStr(@now, 2, if(is_start, @first_appointment_time_start, @last_appointment_time_start));
      RETURN convertStrToDate(@appointment_time_start_$string) + INTERVAL days_offset DAY;
END; //
-- ///////////////////////////////////////////////////////////////
-- 4. getIdByProfileName()
drop function if exists getIdByProfileName;
create function getIdByProfileName (
      data_type varchar(100),
      name varchar(100)
) returns int DETERMINISTIC
BEGIN
      if data_type = 'ORG' then
          select org_id into @result from org_profile where label = name;
      elseif data_type = 'ROOM' then
          select room_id into @result from room_profile where label = name;
      elseif data_type = 'USER' then
          select user_id into @result from user_profile where label = name;
      else
          select 'BUG in getProfileNameById().' into @result;
      end if;

      RETURN @result;
END; //
-- ///////////////////////////////////////////////////////////////
