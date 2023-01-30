package calculators.project.spring.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.BBSPost;

@Mapper
public interface BBSFormulasMapper {
	public boolean newPostOne(BBSPost post);
	public boolean updatePostOne(BBSPost post);
	public List<BBSPost> getPostList();
	public BBSPost getPostOne(int postId);
	public String getJsonOne(int postId);
}
