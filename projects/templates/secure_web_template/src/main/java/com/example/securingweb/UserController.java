package com.example.securingweb;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Slf4j
@Controller
public class UserController {

	@Autowired
	private DataSource dataSource;

	@GetMapping("/register")
	public String registerNewUser(Model model) {
		UserProfile userProfile = new UserProfile();
		model.addAttribute("userProfile", userProfile);
		return "register";
	}

	@PostMapping("/register")
	public String registerNewUser(Model model, @ModelAttribute UserProfile userProfile) {
		model.addAttribute("userProfile", userProfile);
		String usernameInput = userProfile.getUsername();
		SecuredPasswordGenerator securedPasswordGenerator = new SecuredPasswordGenerator();
		String encrytedPasswordInput = securedPasswordGenerator.getSecuredPassword(userProfile.getPassword());
		try (Connection conn = dataSource.getConnection()) {
			String query = "{? = call registerUser(?, ?, ?)}";
			CallableStatement stmnt = conn.prepareCall(query);
			stmnt.registerOutParameter(1, Types.INTEGER);
			stmnt.setString(2, usernameInput);
			stmnt.setString(3, encrytedPasswordInput);
			stmnt.setString(4, "ROLE_ADMIN");
			stmnt.execute();
			int res = stmnt.getInt(1);
			switch (res) {
				case 0:
					log.info("Failure. Existing username...");
					break;
				case 1:
					log.info("Successfully registered.");
					break;
				default:
					break;
			}
		} catch (SQLException e) {
			log.error("SQLException thrown. Exception: {}", e.toString());
		}
		return "login";
	}
}
