package calculators.project.spring.model;

import java.util.Date;

import lombok.Data;

@Data
public class BBSPost {
	private int id;
	private String category;
	private Integer categoryId;
	private int creatorId;
	private Date updateDate;
	private String title;
	private String comment;
	private String jsonData;
	private String creatorName;
}
