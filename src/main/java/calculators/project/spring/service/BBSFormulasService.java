package calculators.project.spring.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import calculators.project.spring.mapper.BBSFormulasMapper;
import calculators.project.spring.model.BBSPost;

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

	/** 投稿一覧取得(管理者) */
	public List<BBSPost> adminGetPostList(){
		return mapper.adminGetPostList();
	}

	/** 投稿１件更新(管理者) */
	public boolean adminUpdatePostOne(BBSPost post) {
		post.setUpdateDate(new Date());
		return mapper.adminUpdatePostOne(post);
	}

	/** 指定されたカテゴリの投稿を別のカテゴリへ変更 */
	public boolean changeCategory(int beforeId, int afterId) {
		return mapper.changeCategory(beforeId, afterId);
	}

	/** 投稿１件削除（物理） */
	public boolean deletePostOne(int postId) {
		return mapper.deletePostOne(postId);
	}
}
