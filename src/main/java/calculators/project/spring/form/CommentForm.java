package calculators.project.spring.form;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class CommentForm {
	private Integer postId;
	@NotBlank
	private String comment;
}
