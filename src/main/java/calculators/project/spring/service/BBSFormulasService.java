package calculators.project.spring.service;

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
	
	/** 投稿リストを取得 */
	public List<BBSPost> getPostList(){
		return mapper.getPostList();
	}
	
	/** 投稿を１件取得 */
	public BBSPost getPostOne(int postId) {
		return mapper.getPostOne(postId);
	}
	
	/** JSONデータを１件取得 */
	public String getJsonOne(int postId) {
		return mapper.getJsonOne(postId);
	}
}
