package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class ChangeIdForm {
	@NotBlank
	@Length(max = 100)
	@Pattern(regexp = "^[a-zA-Z0-9 -/:-@\\[-\\`\\{-\\~]*$")
	private String newUserId;
	@NotBlank
	private String nowUserId;
	@NotBlank
	private String nowPassword;
}
