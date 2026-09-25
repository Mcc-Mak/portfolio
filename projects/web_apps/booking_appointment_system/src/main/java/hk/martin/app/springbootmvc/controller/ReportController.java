package hk.martin.app.springbootmvc.controller;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hk.martin.app.springbootmvc.controller.service.AuditService;
import hk.martin.app.springbootmvc.controller.service.UserService;
import hk.martin.app.springbootmvc.controller.service.mapper.model.AuditLog;

@Controller
public class ReportController {

	static final DateTimeFormatter FORMATTER_DATE_TIME = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

	@Autowired
	UserService userService;

	@Autowired
	AuditService auditService;

        // [Layout]
        // 1. Audit log
        @RequestMapping(value = "/api/report/auditLog", method = RequestMethod.GET)
        public String getAuditLogPage(Model model){
                model.addAttribute("condition", "8");
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
        @RequestMapping(value = "/api/report/query-data", method = RequestMethod.GET)
        public ArrayList<HashMap<String, String>> getQueryData(@RequestParam(defaultValue = "") String usage){
		List<AuditLog> auditLogRecords = auditService.getAuditLog();

                ArrayList<HashMap<String, String>> auditLogRecordsJson = new ArrayList<HashMap<String, String>>();

                for(int i=0; i<auditLogRecords.size(); i++) {
                        AuditLog auditLog = auditLogRecords.get(i);
                        if("auditLog".equals(usage)) {
                                auditLogRecordsJson.add(auditLog.toMap(FORMATTER_DATE_TIME));
                        } else {

                        }
                }

                return auditLogRecordsJson;
        }
/*
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
                            return userService.getUpdatedDateMap(userProfiles, formatter2);
                        case "updatedTime":
                            return userService.getUpdatedTimeMap(userProfiles, formatter3);
                        default:
                            return new HashMap<String, String>();
                }
        }
*/
}
