package hk.martin.app.springbootmvc.controller.service.mapper;

import org.apache.ibatis.annotations.Mapper;
import hk.martin.app.springbootmvc.controller.service.mapper.model.Booking;

import java.util.List;
import java.lang.Integer;

@Mapper
public interface BookingMapper {

  List<Booking> getBookingSummary();

  Integer addBooking(Booking booking);

  Integer dropBooking(Booking booking);

  String getNameEngByUsername(String username);

}
