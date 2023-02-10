package calculators.project.spring.model;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Formula {
	private int id;
	private int creatorId;
	private Date updateDate;
	private String title;
	private String jsonData;

	public Formula(
			int creatorId,
			Date updateDate,
			String title,
			String jsonData
	){
		this.creatorId = creatorId;
		this.updateDate = updateDate;
		this.title = title;
		this.jsonData = jsonData;
	}
}
