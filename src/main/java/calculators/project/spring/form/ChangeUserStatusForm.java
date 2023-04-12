package calculators.project.spring.form;

import lombok.Data;

@Data
public class ChangeUserStatusForm {
	private Integer id;
	private String userName;
	private Boolean isChange;
	private String password;
	private String confirm;
	private String role;
}
