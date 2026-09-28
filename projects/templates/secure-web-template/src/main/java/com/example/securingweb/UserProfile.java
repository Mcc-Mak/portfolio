package com.example.securingweb;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class UserProfile {
	private String username;
	private String password;
	private String passwordRepeat;
}
