package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class ConfirmIdPasswordForm {
	@NotBlank
	private String nowUserId;
	@NotBlank
	private String nowPassword;
}
