package calculators.project.spring.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.Comment;

@Mapper
public interface CommentsMapper {
	public List<Comment> adminGetCommentList();
	public List<Comment> getCommentList(int postId);
	public boolean addCommentOne(Comment comment);
	public boolean changeCommentView(int postId,int no);
	public boolean deleteComments(int postId);
}
