package calculators.project.spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import calculators.project.spring.model.LoginUser;
import calculators.project.spring.model.LoginUserDetails;

@Service
public class LoginUserDetailsService implements UserDetailsService{
	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LoginUser loginUser = userService.findUserOneUserId(username);
		
		if(loginUser == null) {
			throw new UsernameNotFoundException("user not found");
		}
		
		return new LoginUserDetails(loginUser);
	}
}