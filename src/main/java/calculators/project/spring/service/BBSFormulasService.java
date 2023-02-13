package calculators.project.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import calculators.project.spring.mapper.BBSFormulasMapper;
import calculators.project.spring.model.BBSPost;
import calculators.project.spring.model.Category;

@Service
public class BBSFormulasService {
	@Autowired
	private BBSFormulasMapper mapper;

	/** 投稿を１件追加 */
	public boolean newPostOne(BBSPost post) {
		return mapper.newPostOne(post);
	}

	/** 投稿を１件更新 */
	public boolean updatePostOne(BBSPost post) {
		return mapper.updatePostOne(post);
	}

	/** 投稿リストを取得 */
	public List<BBSPost> getPostList(){
		return mapper.getPostList(null);
	}
	public List<BBSPost> getPostList(Integer creatorId){
		return mapper.getPostList(creatorId);
	}

	/** 投稿を１件取得 */
	public BBSPost getPostOne(int postId) {
		return mapper.getPostOne(postId);
	}

	/** JSONデータを１件取得 */
	public String getJsonOne(int postId) {
		return mapper.getJsonOne(postId);
	}

	/** 投稿を１件論理削除 */
	public boolean hidePostOne(int id, int creatorId) {
		return mapper.hidePostOne(id, creatorId);
	}

	/** 自身の投稿を全件論理削除 */
	public boolean hidePostAll(int creatorId) {
		return mapper.hidePostAll(creatorId);
	}

	/** カテゴリ選択肢のリストを取得 */
	public List<Category> getCategoryList(String locale){
		List<Category> categoryList = mapper.getCategoryList(locale);
		if(categoryList.isEmpty()) {
			categoryList.add(new Category(0,"データ取得失敗"));
			return categoryList;
		}
		// その他が最後に来るよう並び替え
		categoryList.add(categoryList.get(0));
		categoryList.remove(0);
		return categoryList;
	}
}
