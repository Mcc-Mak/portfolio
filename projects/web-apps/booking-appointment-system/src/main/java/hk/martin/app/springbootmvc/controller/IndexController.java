package hk.martin.app.springbootmvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import hk.martin.app.springbootmvc.controller.service.UserService;

import java.util.HashMap;
import java.util.stream.Collectors;

@Controller
public class IndexController {

	@Autowired
	UserService userService;

	@RequestMapping(value = {"", "/index"})
	public String index(Model model){
                String role = String.join(", ",
                    userService.getUserAuthen().getAuthorities()
                        .stream().map(
                            element -> element.getAuthority()
                        ).collect(Collectors.toList())
                );
		model.addAttribute("condition", "ROLE_ANON".equals(role) ? "0" : "1" );
                model.addAttribute("userRole", role);
                String username = userService.getUserAuthen().getUsername();
                model.addAttribute("userName", username);
                model.addAttribute("userNameEng", userService.getNameEngByUsername(username));
		return "_layout";
	}

	@ResponseBody
	@RequestMapping(value = {"/meta-data"})
	public HashMap<String, String> getMetaData(Model model){
                String role = String.join(", ",
                    userService.getUserAuthen().getAuthorities()
                        .stream().map(
                            element -> element.getAuthority()
                        ).collect(Collectors.toList())
                );
		String username = userService.getUserAuthen().getUsername();
		HashMap<String, String> metaData = new HashMap<String, String>();
		metaData.put("role", role);
		metaData.put("username", username);
		metaData.put("userNameEng", userService.getNameEngByUsername(username));
		return metaData;
	}

}
