package calculators.project.spring.model;

import java.util.Date;

import lombok.Data;

@Data
public class Comment {
	private Integer no;
	private String posterName;
	private Date postDate;
	private String comment;
}
