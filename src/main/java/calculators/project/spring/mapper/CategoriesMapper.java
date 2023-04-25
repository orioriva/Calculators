package calculators.project.spring.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.Category;

@Mapper
public interface CategoriesMapper {
	public List<Category> getCategoryList();
	public boolean addCategoryOne(String name);
	public boolean updateCategoryOne(Category category);
	public boolean deleteCategoryOne(int id);
}
