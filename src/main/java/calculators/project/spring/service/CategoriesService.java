package calculators.project.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import calculators.project.spring.mapper.CategoriesMapper;
import calculators.project.spring.model.Category;

@Service
public class CategoriesService {
	@Autowired
	private CategoriesMapper mapper;

	/** カテゴリ選択肢のリストを取得 */
	public List<Category> getCategoryList(boolean otherIsLast){
		List<Category> categoryList = mapper.getCategoryList();
		if(categoryList.isEmpty()) {
			categoryList.add(new Category(0,"データ取得失敗"));
			return categoryList;
		}
		// その他が最後に来るよう並び替え
		if(otherIsLast) {
			categoryList.add(categoryList.get(0));
			categoryList.remove(0);
		}
		return categoryList;
	}

	/** カテゴリ１件追加 */
	public boolean addCategoryOne(String name) {
		return mapper.addCategoryOne(name);
	}

	/** カテゴリ名１件変更 */
	public boolean updateCategoryOne(Category category) {
		return mapper.updateCategoryOne(category);
	}

	/** カテゴリ１件削除 */
	public boolean deleteCategoryOne(int id) {
		return mapper.deleteCategoryOne(id);
	}
}
