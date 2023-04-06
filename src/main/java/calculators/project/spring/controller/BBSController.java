package calculators.project.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import calculators.project.spring.model.BBSPost;
import calculators.project.spring.model.Comment;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.CommentsService;

@Controller
public class BBSController {
	@Autowired
	private BBSFormulasService bbsFormulasService;

	@Autowired
	private CommentsService commentsService;

	@GetMapping("/bbs")
	public String getBBS() {
		return "bbs/bbs";
	}

	@GetMapping("/bbs/newpost")
	public String getNewPost() {
		return "bbs/newpost";
	}

	@GetMapping("/bbs/post")
	public String getPost(Model model,
			@RequestParam(value="postId")Integer postId
	) {
		BBSPost postData = bbsFormulasService.getPostOne(postId);
		List<Comment> commentList = commentsService.getCommentList(postId);
		model.addAttribute("postData", postData);
		model.addAttribute("commentList", commentList);
		return "bbs/post";
	}

	@GetMapping("/bbs/post/update")
	public String getUpdatePost(
		@RequestParam(value="postId")Integer postId,
		@AuthenticationPrincipal LoginUserDetails user
	) {
		BBSPost postData = bbsFormulasService.getPostOne(postId);
		if(postData == null || user.getLoginUser().getId() != postData.getCreatorId()) {
			return "redirect:/bbs";
		}
		return "bbs/updatepost";
	}
}
