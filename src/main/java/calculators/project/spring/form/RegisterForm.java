package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class RegisterForm {
	@NotBlank
	@Length(max = 20)
	private String userName;
	
	@NotBlank
	@Length(max = 100)
	@Pattern(regexp = "^[a-zA-Z0-9 -/:-@\\[-\\`\\{-\\~]*$")
	private String userId;
	
	@NotBlank
	@Length(max = 100)
	@Pattern(regexp = "^[a-zA-Z0-9 -/:-@\\[-\\`\\{-\\~]*$")
	private String password;
}
