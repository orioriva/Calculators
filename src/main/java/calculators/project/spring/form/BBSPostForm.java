package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class BBSPostForm {
	@NotEmpty
	private String postFormula;
	@NotBlank
	private String title;
	@NotEmpty
	private String category;
	private String comment;
}
