package hk.martin.app.springbootmvc.controller.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MysqlService {

	@Value("${spring.datasource.url}")
	private String dbConnectionString;

	@Value("${spring.datasource.username}")
	private String dbUsername;

	@Value("${spring.datasource.password}")
	private String dbPassword;

	public String getDbConnectionString() {
		return dbConnectionString;
	}

	public String getDbUsername() {
		return dbUsername;
	}

	public String getDbPassword() {
		return dbPassword;
	}

}
