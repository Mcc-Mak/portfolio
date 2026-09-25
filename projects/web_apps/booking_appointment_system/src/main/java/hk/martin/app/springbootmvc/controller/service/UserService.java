package hk.martin.app.springbootmvc.controller.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import hk.martin.app.springbootmvc.controller.service.mapper.model.UserProfile;
import hk.martin.app.springbootmvc.controller.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.time.format.DateTimeFormatter;

@Service
public class UserService {

  public HashMap<String, String> roleMapAll = new HashMap<String, String>() {{
    put("ROLE_ADMIN", "Administrator");
    put("ROLE_USER", "User");
    put("ROLE_ANON", "Anonymous");
  }};

  public HashMap<String, String> isEnableMapAll = new HashMap<String, String>() {{
    put("0", "No");
    put("1", "Yes");
  }};


  @Autowired
  private UserMapper userMapper;

  public HashMap<String, String> getBackendRoleMap() {
    return roleMapAll;
  }

  public HashMap<String, String> getBackendIsEnableMap() {
    return isEnableMapAll;
  }

  public UserDetails getUserAuthen() {
    UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return principal;
  }

  public String getNameEngByUsername(String username) {
    String userNameEng = userMapper.getNameEngByUsername(username);
    return userNameEng;
  }

  public List<UserProfile> getUserProfiles() {
    return userMapper.getUserProfiles();
  }

  public int updateActivation() {
    return userMapper.updateActivation();
  }

  public int deleteUser(UserProfile userProfile) {
    return userMapper.deleteUser(userProfile);
  }

  public int deleteUserProfile(UserProfile userProfile) {
    return userMapper.deleteUserProfile(userProfile);
  }

  public int resetBookingAppointment(UserProfile userProfile) {
    return userMapper.resetBookingAppointment(userProfile);
  }

  public UserProfile checkDelta(UserProfile userProfile) {
    return userMapper.checkDelta(userProfile);
  }

  public int activateUser(UserProfile userProfile) {
    return userMapper.activateUser(userProfile);
  }

  public HashMap<String, String> getUsernameMap(List<UserProfile> userProfiles) {
    HashMap<String, String> temp = new HashMap<String, String>();
    userProfiles.forEach(
      userProfile -> {temp.put(userProfile.getUsername(), userProfile.getUsername());}
    );
    return temp;
  }

  public HashMap<String, String> getRoleMap(List<UserProfile> userProfiles) {
    HashMap<String, String> temp = new HashMap<String, String>();
    userProfiles.forEach(
      userProfile -> {temp.put(userProfile.getRole(), roleMapAll.get(userProfile.getRole()));}
    );
    return temp;
  }

  public HashMap<String, String> getNameEngMap(List<UserProfile> userProfiles) {
    HashMap<String, String> temp = new HashMap<String, String>();
    userProfiles.forEach(
      userProfile -> {temp.put(userProfile.getNameEng(), userProfile.getNameEng());}
    );
    return temp;
  }

  public HashMap<String, String> getIsEnableMap(List<UserProfile> userProfiles) {
    HashMap<String, String> temp = new HashMap<String, String>();
    userProfiles.forEach(
      userProfile -> {temp.put(userProfile.getIsEnable(), isEnableMapAll.get(userProfile.getIsEnable()));}
    );
    return temp;
  }

  public HashMap<String, String> getUpdatedByMap(List<UserProfile> userProfiles) {
    HashMap<String, String> temp = new HashMap<String, String>();
    userProfiles.forEach(
      userProfile -> {temp.put(userProfile.getUpdatedBy(), userProfile.getUpdatedBy());}
    );
    return temp;
  }

  public HashMap<String, String> getUpdatedDateMap(List<UserProfile> userProfiles, DateTimeFormatter formatter) {
    HashMap<String, String> temp = new HashMap<String, String>();
    userProfiles.forEach(
      userProfile -> {
        temp.put(
          userProfile.getUpdatedDatetime().format(formatter),
          userProfile.getUpdatedDatetime().format(formatter)
        );
      }
    );
    return temp;
  }

  public HashMap<String, String> getUpdatedTimeMap(List<UserProfile> userProfiles, DateTimeFormatter formatter) {
    HashMap<String, String> temp = new HashMap<String, String>();
    userProfiles.forEach(
      userProfile -> {
        temp.put(
          userProfile.getUpdatedDatetime().format(formatter),
          userProfile.getUpdatedDatetime().format(formatter)
        );
      }
    );
    return temp;
  }

}
