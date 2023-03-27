package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class BBSPostForm {
	private Integer postId;
	private String changeFormula;
	@NotNull
	@Positive
	private Integer postFormula;
	@NotBlank
	@Length(max = 50)
	private String title;
	@NotNull
	@Positive
	private Integer category;
	private String comment;
}
