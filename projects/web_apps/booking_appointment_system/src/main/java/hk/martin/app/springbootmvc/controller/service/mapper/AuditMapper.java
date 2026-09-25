package hk.martin.app.springbootmvc.controller.service.mapper;

import org.apache.ibatis.annotations.Mapper;
import hk.martin.app.springbootmvc.controller.service.mapper.model.AuditLog;

import java.util.List;
import java.lang.Integer;

@Mapper
public interface AuditMapper {

  Integer logForAudit(AuditLog auditLog);

  List<AuditLog> getAuditLog();

}
