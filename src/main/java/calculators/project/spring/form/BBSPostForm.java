package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class BBSPostForm {
	private Integer postId;
	private String changeFormula;
	@NotNull
	private Integer postFormula;
	@NotBlank
	private String title;
	@NotNull
	private Integer category;
	private String comment;
}
