package calculators.project.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import calculators.project.spring.mapper.CommentsMapper;
import calculators.project.spring.model.Comment;

@Service
public class CommentsService {
	@Autowired
	private CommentsMapper mapper;

	/** コメント一覧取得 */
	public List<Comment> getCommentList(int postId){
		return mapper.getCommentList(postId);
	}
	
	/** コメント１件追加 */
	public boolean addCommentOne(Comment comment) {
		return mapper.addCommentOne(comment);
	}
}
