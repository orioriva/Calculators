package calculators.project.spring.controller.rest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.form.CommentForm;
import calculators.project.spring.model.Comment;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.model.RestResult;
import calculators.project.spring.service.CommentsService;
import calculators.project.spring.service.ErrorCheckService;

@RestController
public class RestCommentController {
	@Autowired
	private CommentsService commentService;
	
	@Autowired
	private ErrorCheckService errorCheck;
	
	@PostMapping("/rest/comment")
	public RestResult postAddFormula(
			@AuthenticationPrincipal LoginUserDetails user,
			@Validated CommentForm form,
			BindingResult bindingResult)
	{
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);
		// エラーが見つかった場合
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}
		
		Comment comment = new Comment();
		comment.setComment(form.getComment());
		comment.setPostDate(new Date());
		comment.setPosterId(user.getLoginUser().getId());
		comment.setPostId(form.getPostId());
		
		System.out.println(comment);
		
		if(!commentService.addCommentOne(comment)) {
			return new RestResult(500, null);
		}
		return new RestResult(0, null);
	}
}
