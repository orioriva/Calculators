package calculators.project.spring.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
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
                .defaultSuccessUrl("/")	// ログイン後
                .failureUrl("/login?error")
                .permitAll()	// ログイン画面の未ログイン時のアクセス許可
        ).logout(logout -> logout
                .logoutSuccessUrl("/")
        ).authorizeHttpRequests(authz -> authz
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                .mvcMatchers("/").permitAll()
                .mvcMatchers("/calculator").permitAll()
                .mvcMatchers("/general").hasRole("GENERAL")
                .mvcMatchers("/admin").hasRole("ADMIN")
                .anyRequest().authenticated()
        );
        return http.build();
    }
}