package calculators.project.spring.model;

import lombok.Data;

@Data
public class Category {
	private int id;
	private String name;

	public Category() {};
	public Category(int id, String name) {
		this.id = id;
		this.name = name;
	};
}
