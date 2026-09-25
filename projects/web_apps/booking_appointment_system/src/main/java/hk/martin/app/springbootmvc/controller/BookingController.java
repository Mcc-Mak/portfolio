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
import hk.martin.app.springbootmvc.controller.service.BookingService;
import hk.martin.app.springbootmvc.controller.service.UserService;
import hk.martin.app.springbootmvc.controller.service.mapper.model.Booking;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/booking")
public class BookingController {

	static final DateTimeFormatter FORMATTER_DATE_TIME = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
	static final DateTimeFormatter FORMATTER_DATE = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	static final DateTimeFormatter FORMATTER_TIME = DateTimeFormatter.ofPattern("HH:mm");

	@Autowired
	UserService userService;

	@Autowired
	BookingService bookingService;

        @Autowired
        AuditService auditService;

	// [Layout]
	// 1. Query
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String getQueryBookingPage(Model model){
		model.addAttribute("condition", "2");
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
	// 2. Add
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public String getAddBookingPage(Model model){
		model.addAttribute("condition", "4");
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
	// 3. Drop
	@RequestMapping(value = "/drop", method = RequestMethod.GET)
	public String getDropBookingPage(Model model){
		model.addAttribute("condition", "5");
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
	@RequestMapping(value = "/query-data", method = RequestMethod.GET)
	public ArrayList<HashMap<String, String>> getQueryData(@RequestParam(defaultValue = "") String usage){
		List<Booking> bookings = bookingService.getBookingSummary();

		ArrayList<HashMap<String, String>> bookingsJson = new ArrayList<HashMap<String, String>>();
		for(int i=0; i<bookings.size(); i++) {
			Booking booking = bookings.get(i);
			if("add".equals(usage)) {
				bookingsJson.add(bookings.get(i).toMap(FORMATTER_DATE_TIME));
			} else if("drop".equals(usage)) {
				bookingsJson.add(bookings.get(i).toMap(FORMATTER_DATE_TIME));
			} else {
				bookingsJson.add(bookings.get(i).toMap(FORMATTER_DATE_TIME));
			}
		}
		return bookingsJson;
	}

	// [DataList]
	@ResponseBody
	@RequestMapping(value = "/getDataList", method = RequestMethod.GET)
	public List<String> getDataList(@RequestParam(defaultValue = "") String usage, @RequestParam String attr) {
		List<Booking> bookings = bookingService.getBookingSummary();
		if("add".equals(usage)) {

		} else if("drop".equals(usage)) {

		}
		switch(attr) {
			case "org":
				return bookings.stream().map(
					booking -> booking.getNameEngOrg()
				).distinct().sorted().collect(Collectors.toList());
			case "room":
				return bookings.stream().map(
					booking -> booking.getNameEngRoom()
				).distinct().sorted().collect(Collectors.toList());
			case "user":
				return bookings.stream().map(
					booking -> booking.getNameEngUser()
				).distinct().sorted().collect(Collectors.toList());
			case "dateStart":
				return bookings.stream().map(
					booking -> booking.getTimeslotStart().format(FORMATTER_DATE)
				).distinct().sorted().collect(Collectors.toList());
			case "timeStart":
				return bookings.stream().map(
					booking -> booking.getTimeslotStart().format(FORMATTER_TIME)
				).distinct().sorted().collect(Collectors.toList());
			case "dateEnd":
				return bookings.stream().map(
					booking -> booking.getTimeslotEnd().format(FORMATTER_DATE)
				).distinct().sorted().collect(Collectors.toList());
			case "timeEnd":
				return bookings.stream().map(
					booking -> booking.getTimeslotEnd().format(FORMATTER_TIME)
				).distinct().sorted().collect(Collectors.toList());
			case "updatedDatetime":
				return bookings.stream().map(
					booking -> booking.getUpdatedDatetime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
				).distinct().sorted().collect(Collectors.toList());
			case "updatedBy":
				return bookings.stream().map(
					booking -> booking.getUpdatedBy()
				).distinct().sorted().collect(Collectors.toList());
		}
		return new ArrayList<String>();
	}

	// [Appointment] Execution
        @ResponseBody
        @RequestMapping(value = "/addBooking", method = RequestMethod.POST)
        public String addBooking(@RequestBody Booking booking) {
		booking.setNameEngUser(userService.getUserAuthen().getUsername());
		Integer res = bookingService.addBooking(booking);
		auditService.logForAudit(auditService.init("ADD", "BOOKING", res.toString(), userService.getNameEngByUsername(userService.getUserAuthen().getUsername())));
		return res.toString();
        }

        @ResponseBody
        @RequestMapping(value = "/dropBooking", method = RequestMethod.POST)
        public String dropBooking(@RequestBody Booking booking) {
		booking.setNameEngUser(userService.getUserAuthen().getUsername());
		Integer res = bookingService.dropBooking(booking);
		auditService.logForAudit(auditService.init("DROP", "BOOKING", res.toString(), userService.getNameEngByUsername(userService.getUserAuthen().getUsername())));
		return res.toString();
        }

}
