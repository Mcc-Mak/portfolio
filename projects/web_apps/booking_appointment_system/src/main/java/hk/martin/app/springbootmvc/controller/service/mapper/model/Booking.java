package hk.martin.app.springbootmvc.controller.service.mapper.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.*;
import java.text.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ToString
@Getter @Setter
public class Booking {

    private String nameEngOrg;
    private String nameEngRoom;
    private String nameEngUser;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime timeslotStart;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime timeslotStart2;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime timeslotEnd;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime timeslotEnd2;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedDatetime;
    private String updatedBy;

    private String action;

    public HashMap<String, String> toMap(DateTimeFormatter formatter) {
        HashMap<String, String> out = new HashMap<String, String>();
        out.put("nameEngOrg", nameEngOrg);
        out.put("nameEngRoom", nameEngRoom);
        out.put("nameEngUser", nameEngUser);
        out.put("timeslotStart", timeslotStart.format(formatter));
        out.put("timeslotStart2", timeslotStart.format(formatter));
        out.put("timeslotEnd", timeslotEnd.format(formatter));
        out.put("timeslotEnd2", timeslotEnd.format(formatter));
        out.put("updatedDatetime", updatedDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        out.put("updatedBy", updatedBy);
        out.put("action", action);
        return out;
    }
}
