package hk.martin.app.springbootmvc.controller.service;

import hk.martin.app.springbootmvc.controller.service.mapper.ConfigMapper;
import hk.martin.app.springbootmvc.controller.service.mapper.model.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfigService {

  @Autowired
  private ConfigMapper configMapper;

  public List<Parameter> getParametersData() {
    return configMapper.getParametersData();
  }

  public Parameter checkDelta(Parameter parameter) {
    return configMapper.checkDelta(parameter);
  }

  public int updateDelta(Parameter parameter) {
    return configMapper.updateDelta(parameter);
  }

}
