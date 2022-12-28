package calculators.project.spring.model;

import lombok.Data;

@Data
public class LoginUser {
	private Integer id;
	private String userName;
	private String userId;
	private String password;
	private String role;
}
