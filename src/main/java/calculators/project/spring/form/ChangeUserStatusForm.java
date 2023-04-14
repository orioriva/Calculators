package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import calculators.project.spring.model.LoginUser;
import lombok.Data;

@Data
public class ChangeUserStatusForm {
	private Integer id;
	@NotBlank
	@Length(max = 20)
	private String userName;
	private Boolean isChange;
	@NotBlank
	@Length(max = 20)
	private String userId;
	@NotBlank
	@Length(max = 100)
	private String password;
	@NotBlank
	@Length(max = 100)
	private String confirm;
	private String role;

	/** ユーザー情報クラスへマッピング */
	public LoginUser toLoginUser() {
		LoginUser user = new LoginUser();
		user.setId(this.id);
		user.setUserName(this.userName);
		user.setUserId(this.userId);
		user.setPassword(this.isChange ? this.password : null);
		user.setRole(this.role);
		return user;
	}
}
