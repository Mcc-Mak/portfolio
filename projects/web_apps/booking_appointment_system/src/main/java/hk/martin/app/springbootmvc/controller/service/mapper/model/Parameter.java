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
public class Parameter {

    private String id;
    private String orgId;
    private String roomId;
    private String tableId;
    private String name;
    private String dataLabel;
    private String dataValue;

    private String updatedBy;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedDatetime;

    public HashMap<String, String> toMap() {
        HashMap<String, String> out = new HashMap<String, String>();
        out.put("id", id);
        out.put("orgId", orgId);
        out.put("roomId", roomId);
        out.put("tableId", tableId);
        out.put("name", name);
        out.put("dataLabel", dataLabel);
        out.put("dataValue", dataValue);
        out.put("updatedBy", updatedBy);
        out.put("updatedDatetime", updatedDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return out;
    }

    public static Boolean compareParameters(Parameter parameter1, Parameter parameter2) {
        return (
            parameter1.getId().equals(parameter2.getId())
        ) && (
            (parameter1.getOrgId() == null && parameter2.getOrgId() == null) || parameter1.getOrgId().equals(parameter2.getOrgId())
        ) && (
            (parameter1.getRoomId() == null && parameter2.getRoomId() == null) || parameter1.getRoomId().equals(parameter2.getRoomId())
        ) && (
            (parameter1.getTableId() == null && parameter2.getTableId() == null) || parameter1.getTableId().equals(parameter2.getTableId())
        ) && (
            (parameter1.getName() == null && parameter2.getName() == null) || parameter1.getName().equals(parameter2.getName())
        ) && (
            (parameter1.getDataLabel() == null && parameter2.getDataLabel() == null) || parameter1.getDataLabel().equals(parameter2.getDataLabel())
        ) && (
            (parameter1.getDataValue() == null && parameter2.getDataValue() == null) || parameter1.getDataValue().equals(parameter2.getDataValue())
        );
    }
}
