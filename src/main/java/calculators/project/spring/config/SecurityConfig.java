package calculators.project.spring.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig{
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.formLogin(login -> login
			.loginProcessingUrl("/login")
			.loginPage("/login")
			.defaultSuccessUrl("/mypage/top",true)	// ログイン後
			.failureUrl("/login?error")
			.permitAll()	// ログイン画面の未ログイン時のアクセス許可
		).logout(logout -> logout
			.logoutUrl("/logout")
			.logoutSuccessUrl("/login?logout")
			.permitAll()
		).authorizeHttpRequests(authz -> authz
			.requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
			.mvcMatchers("/img/**").permitAll()
			.mvcMatchers("/").permitAll()
			.mvcMatchers("/calculator").permitAll()
			.mvcMatchers("/register").permitAll()
			.mvcMatchers("/rest/users").permitAll()
			.mvcMatchers("/bbs").permitAll()
			.mvcMatchers("/rest/posts/**").permitAll()
			.mvcMatchers("/rest/comments").permitAll()
			.mvcMatchers("/bbs/post").permitAll()
			.mvcMatchers("/rest/category").permitAll()
			.antMatchers("/h2-console/**").permitAll()
			.mvcMatchers("/admin/**").hasRole("ADMIN")
			.anyRequest().authenticated()
		).headers(header -> header
			.frameOptions()
			.disable()
		).csrf(csrf -> csrf
			.ignoringAntMatchers("/h2-console/**")
		);
		return http.build();
	}
}
