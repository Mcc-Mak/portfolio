package hk.martin.app.springbootmvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hk.martin.app.springbootmvc.controller.service.AuditService;
import hk.martin.app.springbootmvc.controller.service.ConfigService;
import hk.martin.app.springbootmvc.controller.service.UserService;
import hk.martin.app.springbootmvc.controller.service.mapper.model.Parameter;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/config")
public class ConfigController {

	@Autowired
	UserService userService;

	@Autowired
	ConfigService configService;

	@Autowired
	AuditService auditService;

	// [Layout]
	@RequestMapping(value = "/parameters", method = RequestMethod.GET)
	public String getParametersPage(Model model){
                model.addAttribute("condition", "3");
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
        @RequestMapping(value = "/parameters-data", method = RequestMethod.GET)
        public ArrayList<HashMap<String, String>> getParametersData(){
                List<Parameter> parameters = configService.getParametersData();

                ArrayList<HashMap<String, String>> parametersJson = new ArrayList<HashMap<String, String>>();
                for(int i=0; i<parameters.size(); i++) {
                        parametersJson.add(parameters.get(i).toMap());
                }
                return parametersJson;
        }

	// [DataList]
        @ResponseBody
        @RequestMapping(value = "/getDataList", method = RequestMethod.GET)
        public List<String> getDataList(@RequestParam String attr) {
                List<Parameter> parameters = configService.getParametersData();
                switch(attr) {
                        case "name":
                                return parameters.stream().map(
                                        parameter -> parameter.getName()
                                ).distinct().sorted().collect(Collectors.toList());
                        case "dataLabel":
                                return parameters.stream().map(
                                        parameter -> parameter.getDataLabel()
                                ).distinct().sorted().collect(Collectors.toList());
                        case "updatedBy":
                                return parameters.stream().map(
                                        parameter -> parameter.getUpdatedBy()
                                ).distinct().sorted().collect(Collectors.toList());
                        case "updatedDatetime":
                                return parameters.stream().map(
                                        parameter -> parameter.getUpdatedDatetime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                ).distinct().sorted().collect(Collectors.toList());
                        default:
                                return new ArrayList<String>(Arrays.asList(""));

                }
        }

	@ResponseBody
	@RequestMapping(value = "/checkDelta", method = RequestMethod.POST)
        public List<Parameter> checkDelta(@RequestBody List<Parameter> parametersNew) {
		return parametersNew.stream().filter(parameterNew -> {
			return configService.checkDelta(parameterNew) == null;
		}).collect(Collectors.toList());
        }

	@ResponseBody
	@RequestMapping(value = "/updateDelta", method = RequestMethod.POST)
        public List<Parameter> updateDelta(@RequestBody List<Parameter> parametersNew) {
                String username = userService.getUserAuthen().getUsername();
		return parametersNew.stream().filter(parameterNew -> {
                        parameterNew.setUpdatedBy(username);
                        int res = configService.updateDelta(parameterNew);
			auditService.logForAudit(auditService.init("UPDATE", "CONFIGURATION", String.valueOf(res), userService.getNameEngByUsername(userService.getUserAuthen().getUsername())));
			return res == 1;
		}).collect(Collectors.toList());
        }

}
