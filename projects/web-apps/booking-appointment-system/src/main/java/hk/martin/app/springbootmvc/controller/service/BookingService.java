package hk.martin.app.springbootmvc.controller.service;

import hk.martin.app.springbootmvc.controller.service.mapper.BookingMapper;
import hk.martin.app.springbootmvc.controller.service.mapper.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.lang.Integer;

@Service
public class BookingService {

  @Autowired
  private BookingMapper bookingMapper;

  public List<Booking> getBookingSummary() {
    return bookingMapper.getBookingSummary();
  }

  public Integer addBooking(Booking booking) {
    return bookingMapper.addBooking(booking);
  }

  public Integer dropBooking(Booking booking) {
    return bookingMapper.dropBooking(booking);
  }

  public String getNameEngByUsername(String username) {
    return bookingMapper.getNameEngByUsername(username);
  }

}
