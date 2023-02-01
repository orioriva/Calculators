package calculators.project.spring.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.BBSPost;
import calculators.project.spring.model.Category;

@Mapper
public interface BBSFormulasMapper {
	public List<Category> getCategoryList(String locale);
	public boolean newPostOne(BBSPost post);
	public boolean updatePostOne(BBSPost post);
	public List<BBSPost> getPostList(Integer creatorId);
	public BBSPost getPostOne(int postId);
	public String getJsonOne(int postId);
	public boolean hidePostOne(int id, int creatorId);
}
