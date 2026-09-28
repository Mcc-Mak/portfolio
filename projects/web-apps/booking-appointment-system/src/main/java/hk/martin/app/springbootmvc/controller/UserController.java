package hk.martin.app.springbootmvc.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hk.martin.app.springbootmvc.controller.service.AuditService;
import hk.martin.app.springbootmvc.controller.service.MysqlService;
import hk.martin.app.springbootmvc.controller.service.SecuredPasswordService;
import hk.martin.app.springbootmvc.controller.service.UserService;
import hk.martin.app.springbootmvc.controller.service.mapper.model.UserProfile;

@Controller
public class UserController {

	static final DateTimeFormatter FORMATTER_DATE = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	static final DateTimeFormatter FORMATTER_TIME = DateTimeFormatter.ofPattern("HH:mm:ss");

	@Autowired
	SecuredPasswordService securedPasswordService;

	@Autowired
	MysqlService mysqlService;

	@Autowired
	UserService userService;

	@Autowired
	AuditService auditService;

	@RequestMapping("/login")
	public String login() {
		int res = userService.updateActivation();
		System.out.println(
			res > 1 ?
				String.format("[Info] Successfully updated accounts activation! %s record(s) updated.", String.valueOf(res)) :
					"[Warning] Outdated accounts activation or no account of expiry.");
		return "login";
	}

	@RequestMapping("/register")
	public String register(Model model) {
		UserProfile userProfile = new UserProfile();
		model.addAttribute("userProfile", userProfile);
		return "register";
	}

	@PostMapping("/register")
	public String registerNewUser(Model model, @ModelAttribute UserProfile userProfile) {
		model.addAttribute("userProfile", userProfile);

		String template = "";
		String message = "";

		String userNameEng = userProfile.getUserNameEng();
		String password = userProfile.getPassword();
		String passwordRepeat = userProfile.getPasswordRepeat();
		if("".equals(password)) {
			message = "[registerNewUser] Failure. Null password...";
			template = "register";
                } else if(!password.equals(passwordRepeat)) {
			message = "[registerNewUser] Failure. Mismatch password...";
			template = "register";
		}
		if(!"".equals(template)) {
			model.addAttribute("message", message);
			System.out.println(message);
			return template;
		}
		try {
			String usernameInput = userProfile.getUsername();
			String encryptedPasswordInput = securedPasswordService.getSecuredPassword(userProfile.getPassword());

			Connection conn = DriverManager.getConnection(mysqlService.getDbConnectionString(), mysqlService.getDbUsername(), mysqlService.getDbPassword());
			String query = "{? = call registerUser(?, ?, ?, ?, ?)}";
			CallableStatement stmnt = conn.prepareCall(query);
			stmnt.registerOutParameter(1, java.sql.Types.INTEGER);
			stmnt.setString(2, "1");
			stmnt.setString(3, userNameEng);
			stmnt.setString(4, usernameInput);
			stmnt.setString(5, encryptedPasswordInput);
			stmnt.setString(6, "ROLE_ANON");
			stmnt.execute();
			int res = stmnt.getInt(1);
			if(res == 1) {
				message = "[registerNewUser] Successfully registered.";
				template = "redirect:login";
			} else {
				message = "[registerNewUser] Failure. Existing username...";
				template = "register";
			}
			auditService.logForAudit(auditService.init("REGISTER", "", String.valueOf(res), null));
		} catch(SQLException e) {
			auditService.logForAudit(auditService.init("REGISTER", "", "-1", null));
			message = "'SQLException' thrown. Exception: " + e.toString();
			template = "register";
		}
		model.addAttribute("message", message);
		System.out.println(message);
		return template;
	}

        @ResponseBody
        @RequestMapping(value = "/api/user/getBackendMap", method = RequestMethod.GET)
        public HashMap<String, String> getBackendMap(@RequestParam String attr) {
		switch(attr) {
			case "role":
	                	return userService.getBackendRoleMap();
			case "isEnable":
                		return userService.getBackendIsEnableMap();
			default:
				return new HashMap<String, String>();
		}
        }

        // [Layout]
        // 1. Delete
        @RequestMapping(value = "/api/user/delete", method = RequestMethod.GET)
        public String getDeleteUserPage(Model model){
                model.addAttribute("condition", "6");
                model.addAttribute(
                        "userRole",
                        String.join(", ",
                                userService.getUserAuthen().getAuthorities()
                                        .stream().map(
                                                element -> element.getAuthority()
                                        ).collect(Collectors.toList())
                        )
                );
                String username = userService.getUserAuthen().getUsername();
                model.addAttribute("userName", username);
                model.addAttribute("userNameEng", userService.getNameEngByUsername(username));
                return "_layout";
        }
        // 2. Activate
        @RequestMapping(value = "/api/user/activate", method = RequestMethod.GET)
        public String getActivateUserPage(Model model){
                model.addAttribute("condition", "7");
                model.addAttribute(
                        "userRole",
                        String.join(", ",
                                userService.getUserAuthen().getAuthorities()
                                        .stream().map(
                                                element -> element.getAuthority()
                                        ).collect(Collectors.toList())
                        )
                );
                String username = userService.getUserAuthen().getUsername();
                model.addAttribute("userName", username);
                model.addAttribute("userNameEng", userService.getNameEngByUsername(username));
                return "_layout";
        }

        // [Data]
        @ResponseBody
        @RequestMapping(value = "/api/user/query-data", method = RequestMethod.GET)
        public ArrayList<HashMap<String, String>> getQueryData(@RequestParam(defaultValue = "") String usage){
		List<UserProfile> userProfiles = userService.getUserProfiles();

                ArrayList<HashMap<String, String>> userProfilesJson = new ArrayList<HashMap<String, String>>();
                for(int i=0; i<userProfiles.size(); i++) {
                        UserProfile userProfile = userProfiles.get(i);
                        if("delete".equals(usage)) {
                                userProfilesJson.add(userProfile.toMap());
                        } else if("activate".equals(usage)) {
                                userProfilesJson.add(userProfile.toMap());
                        } else {

                        }
                }
                return userProfilesJson;
        }

        // [DataList]
        @ResponseBody
        @RequestMapping(value = "/getDataList", method = RequestMethod.GET)
        public HashMap<String, String> getDataList(@RequestParam(defaultValue = "") String usage, @RequestParam String attr) {
		List<UserProfile> userProfiles = userService.getUserProfiles();

                switch(attr) {
                        case "username":
                            return userService.getUsernameMap(userProfiles);
                        case "role":
                            return userService.getRoleMap(userProfiles);
                        case "nameEng":
                            return userService.getNameEngMap(userProfiles);
                        case "isEnable":
                            return userService.getIsEnableMap(userProfiles);
                        case "updatedBy":
                            return userService.getUpdatedByMap(userProfiles);
                        case "updatedDate":
                            return userService.getUpdatedDateMap(userProfiles, FORMATTER_DATE);
                        case "updatedTime":
                            return userService.getUpdatedTimeMap(userProfiles, FORMATTER_TIME);
                        default:
                            return new HashMap<String, String>();
                }
        }

        @ResponseBody
        @RequestMapping(value = "/api/user/deleteUser", method = RequestMethod.POST)
        public int deleteUser(@RequestBody UserProfile userProfile) {
                String username = userService.getUserAuthen().getUsername();
                userProfile.setUserNameEng(username);
                int res1 = userService.deleteUser(userProfile);
                int res2 = userService.deleteUserProfile(userProfile);
                userService.resetBookingAppointment(userProfile);
                auditService.logForAudit(auditService.init("DELETE", "USER", res1 + "," + res2, userService.getNameEngByUsername(userService.getUserAuthen().getUsername())));
                return ( res1 > 0 && res2 > 0 ) ? 1 : 0;
        }

	// [Check]
        @ResponseBody
        @RequestMapping(value = "/api/user/checkDelta", method = RequestMethod.POST)
        public List<UserProfile> checkDelta(@RequestBody List<UserProfile> userProfiles) {
                String username = userService.getUserAuthen().getUsername();
		return userProfiles.stream().filter(userProfile -> {
	                userProfile.setUserNameEng(username);
			return userService.checkDelta(userProfile) != null;
		}).collect(Collectors.toList());
        }

	// [Activate]
        @ResponseBody
        @RequestMapping(value = "/api/user/activateUser", method = RequestMethod.POST)
        public List<UserProfile> activateUser(@RequestBody List<UserProfile> userProfiles) {
                String username = userService.getUserAuthen().getUsername();
		List<UserProfile> res = userProfiles.stream().filter(userProfile -> {
	                userProfile.setUserNameEng(username);
			Integer result = userService.activateUser(userProfile);
	                auditService.logForAudit(auditService.init("ACTIVATE", "USER", String.valueOf(result), userService.getNameEngByUsername(userService.getUserAuthen().getUsername())));
			return result > 0;
		}).collect(Collectors.toList());
		return res;
        }

}
