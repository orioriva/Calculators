package calculators.project.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

import calculators.project.spring.form.BBSPostForm;
import calculators.project.spring.model.BBSPost;
import calculators.project.spring.model.Comment;
import calculators.project.spring.model.Formula;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.CommentsService;
import calculators.project.spring.service.FormulasService;

@Controller
public class BBSController {
	@Autowired
	private FormulasService formulasService;

	@Autowired
	private BBSFormulasService bbsFormulasService;

	@Autowired
	private CommentsService commentsService;

	@GetMapping("/bbs")
	public String getBBS(Model model) {
		model.addAttribute("categoryList", bbsFormulasService.getCategoryList("ja"));
		return "bbs/bbs";
	}

	@GetMapping("/bbs/newpost")
	public String getNewPost(
			Model model,
			@ModelAttribute BBSPostForm form,
			@RequestParam(value="selectedId", defaultValue="0")Integer formulaId,
			@AuthenticationPrincipal LoginUserDetails user
	) {
		String name = "";
		// 投稿する計算表が指定されてきた場合
		if(formulaId != 0) {
			Formula formula = formulasService.getFormulaOne(user.getLoginUser().getId(), formulaId);
			if(formula != null) {
				form.setPostFormula(formula.getId());
				name = formula.getTitle();
			}
		}
		model.addAttribute("categoryList", bbsFormulasService.getCategoryList("ja"));
		model.addAttribute("selectedName", name);
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
		Model model,
		@ModelAttribute BBSPostForm form,
		@RequestParam(value="postId")Integer postId,
		@AuthenticationPrincipal LoginUserDetails user
	) {
		BBSPost postData = bbsFormulasService.getPostOne(postId);
		if(postData == null || user.getLoginUser().getId() != postData.getCreatorId()) {
			return "redirect:/bbs";
		}
		form.setPostId(postData.getId());
		form.setTitle(postData.getTitle());
		form.setCategory(postData.getCategoryId());
		form.setComment(postData.getComment());
		model.addAttribute("categoryList", bbsFormulasService.getCategoryList("ja"));
		model.addAttribute("selectedName", "");
		return "bbs/updatepost";
	}
}
