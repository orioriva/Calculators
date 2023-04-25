package calculators.project.spring.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.BBSPost;

@Mapper
public interface BBSFormulasMapper {
	public boolean newPostOne(BBSPost post);
	public boolean updatePostOne(BBSPost post);
	public List<BBSPost> getPostList(Integer creatorId);
	public BBSPost getPostOne(int postId);
	public String getJsonOne(int postId);
	public boolean hidePostOne(int id, int creatorId);
	public boolean hidePostAll(int creatorId);
	public List<BBSPost> adminGetPostList();
	public boolean adminUpdatePostOne(BBSPost post);
	public boolean changeCategory(int beforeId, int afterId);
	public boolean deletePostOne(int postId);
}
