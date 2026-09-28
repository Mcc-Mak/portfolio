package hk.martin.app.springbootmvc.controller.service.mapper;

import org.apache.ibatis.annotations.Mapper;

import hk.martin.app.springbootmvc.controller.service.mapper.model.UserProfile;

import java.util.List;

@Mapper
public interface UserMapper {

  String getNameEngByUsername(String username);

  List<UserProfile> getUserProfiles();

  int updateActivation();

  int deleteUser(UserProfile userProfile);
  int deleteUserProfile(UserProfile userProfile);
  int resetBookingAppointment(UserProfile userProfile);

  UserProfile checkDelta(UserProfile userProfile);

  int activateUser(UserProfile userProfile);

}
