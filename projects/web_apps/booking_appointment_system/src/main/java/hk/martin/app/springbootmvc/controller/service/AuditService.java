package hk.martin.app.springbootmvc.controller.service;

import hk.martin.app.springbootmvc.controller.service.mapper.AuditMapper;
import hk.martin.app.springbootmvc.controller.service.mapper.model.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.lang.Integer;

@Service
public class AuditService {

  @Autowired
  private AuditMapper auditMapper;

  public AuditLog init(String actName, String catName, String executionResult, String operatedBy) {
    AuditLog auditLog = new AuditLog();
    auditLog.setActName(actName);
    auditLog.setCatName(catName);
    auditLog.setExecutionResult(executionResult);
    auditLog.setOperatedBy(operatedBy);
    // System.out.println(auditLog.toString());
    return auditLog;
  }

  public Integer logForAudit(AuditLog auditLog) {
    return auditMapper.logForAudit(auditLog);
  }

  public List<AuditLog> getAuditLog() {
    return auditMapper.getAuditLog();
  }

}
