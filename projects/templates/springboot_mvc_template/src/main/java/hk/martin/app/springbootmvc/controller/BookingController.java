package hk.martin.app.springbootmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/booking")
public class BookingController {
	@GetMapping("/query")
	public String query(Model model) {
		model.addAttribute("pageName", "Query booking");
		return "booking/query";
	}
}
