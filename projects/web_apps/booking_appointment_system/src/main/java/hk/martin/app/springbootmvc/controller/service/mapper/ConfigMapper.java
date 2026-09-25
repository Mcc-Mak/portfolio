package hk.martin.app.springbootmvc.controller.service.mapper;

import org.apache.ibatis.annotations.Mapper;

import hk.martin.app.springbootmvc.controller.service.mapper.model.Parameter;
import java.util.List;

@Mapper
public interface ConfigMapper {

  List<Parameter> getParametersData();

  Parameter checkDelta(Parameter parameter);

  int updateDelta(Parameter parameter);

}
