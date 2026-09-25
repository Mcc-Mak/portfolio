package hk.martin.app.springbootmvc.controller.service.mapper.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.HashMap;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ToString
@Getter
@Setter
public class UserProfile {

    private String id;
    private String userId;

    private String userNameEng;
    private String username;
    private String password;
    private String passwordRepeat;
    private String role;
    private String nameEng;
    private String isEnable;

    private String updatedBy;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime updatedDatetime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime updatedDatetime2;

    public HashMap<String, String> toMap() {
        HashMap<String, String> out = new HashMap<String, String>();
        out.put("id", userId);
        out.put("userId", userId);
        out.put("username", username);
        out.put("role", role);
        out.put("nameEng", nameEng);
        out.put("isEnable", isEnable);
        out.put("updatedBy", updatedBy);
        out.put("updatedDatetime", updatedDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        out.put("updatedDatetime2", updatedDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return out;
    }

}
