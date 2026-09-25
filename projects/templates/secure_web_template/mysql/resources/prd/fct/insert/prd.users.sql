drop function if exists registerUser;
DELIMITER //
create function registerUser (
        i_username varchar(100),
        i_password varchar(100),
	i_role varchar(100)
) returns int DETERMINISTIC
BEGIN
	set @exist = exists(select username from users where username = i_username);
	if @exist then
		RETURN 0;
	end if;
	insert into users (username, password, role, enabled) values (i_username, i_password, i_role, 1);
	RETURN 1;
END //
DELIMITER ;
