package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class ChangeUserNameForm {
	@NotBlank
	@Length(max = 20)
	private String userName;
}
