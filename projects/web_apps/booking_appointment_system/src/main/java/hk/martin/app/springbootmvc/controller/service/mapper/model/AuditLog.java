package hk.martin.app.springbootmvc.controller.service.mapper.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.*;
import java.text.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ToString
@Getter @Setter
public class AuditLog {

    private String id;
    private String actName;
    private String catName;
    private String executionResult;

    private String operatedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime operatedDatetime;

    private String updatedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedDatetime;

    public HashMap<String, String> toMap(DateTimeFormatter formatter) {
        HashMap<String, String> out = new HashMap<String, String>();
        out.put("id", id);
        out.put("actName", actName);
        out.put("catName", catName);
        out.put("operatedBy", operatedBy);
        out.put("operatedDatetime", operatedDatetime.format(formatter));
        return out;
    }

}
