package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class BBSPostForm {
	@NotBlank
	private String formulaId;
	@NotBlank
	private String title;
	private String category;
	private String comment;
}
