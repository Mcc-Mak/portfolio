package hk.martin.app.springbootmvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private DataSource dataSource;

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().passwordEncoder(new BCryptPasswordEncoder())
			.dataSource(dataSource)
			.usersByUsernameQuery("SELECT username, password, is_enable FROM users WHERE org_id = 1 and is_enable = 1 and username=?")
			.authoritiesByUsernameQuery("SELECT username, role FROM users WHERE org_id = 1 and is_enable = 1 and username=?");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/register").permitAll()
				.antMatchers("/api/**", "/meta-data").hasAnyRole("ADMIN", "USER")
				.antMatchers("/unauthorized").hasAnyRole("ANON")
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login")
				.defaultSuccessUrl("/index")
				.permitAll()
				.and()
			.logout()
				.logoutSuccessUrl("/login").permitAll();
	}


}
