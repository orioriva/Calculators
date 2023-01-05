package calculators.project.spring.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class LoginUserDetails implements UserDetails{
	private final LoginUser loginUser;
	private final List<GrantedAuthority> authList;

	public LoginUserDetails(LoginUser loginUser) {
		this.loginUser = loginUser;
		GrantedAuthority auth = new SimpleGrantedAuthority(loginUser.getRole());
		this.authList = new ArrayList<>();
		this.authList.add(auth);
	}

	public LoginUser getLoginUser() { return this.loginUser; }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authList;
	}

	@Override
	public String getPassword() {
		return this.loginUser.getPassword();
	}

	public String getUserViewName() {
		return this.loginUser.getUserName();
	}

	@Override
	public String getUsername() {
		return this.loginUser.getUserId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
