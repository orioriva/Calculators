package calculators.project.spring.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
	
	/** カテゴリ選択肢のMapを取得 */
	public Map<String, String> getCategoryMap(){
		Map<String, String> map = new LinkedHashMap<String, String>(){
			{
				put("生活", "生活");
				put("健康", "健康");
				put("交通", "交通");
				put("仕事", "仕事");
				put("勉強", "勉強");
				put("遊び", "遊び");
				put("その他", "その他");
			}
		};
		return map;
	}
}
