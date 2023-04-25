package calculators.project.spring.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.model.Category;
import calculators.project.spring.service.CategoriesService;

@RestController
public class RestCategoriesController {
	@Autowired
	private CategoriesService categoriesService;

	/** カテゴリーリスト取得 */
	@GetMapping("/rest/category")
	public List<Category> restGetCategoryList(){
		return categoriesService.getCategoryList(true);
	}
}
