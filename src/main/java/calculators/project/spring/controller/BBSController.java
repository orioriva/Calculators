package calculators.project.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

import calculators.project.spring.form.BBSPostForm;
import calculators.project.spring.model.BBSPost;
import calculators.project.spring.model.Formula;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.FormulasService;

@Controller
public class BBSController {
	@Autowired
	private FormulasService formulasService;

	@Autowired
	private BBSFormulasService bbsFormulasService;

	@GetMapping("/bbs")
	public String getBBS(Model model) {
		model.addAttribute("categoryList", bbsFormulasService.getCategoryList("ja"));
		return "bbs/bbs";
	}

	@GetMapping("/bbs/newpost")
	public String getNewPost(
			Model model,
			@ModelAttribute BBSPostForm form,
			@RequestParam(value="selectedId", defaultValue="")String formulaId,
			@AuthenticationPrincipal LoginUserDetails user
	) {
		String name = "";
		// 投稿する計算表が指定されてきた場合
		if(!formulaId.isEmpty()) {
			Formula formula = formulasService.getFormulaOne(user.getLoginUser().getId(), Integer.parseInt(formulaId));
			if(formula != null) {
				form.setPostFormula(String.valueOf(formula.getId()));
				name = formula.getTitle();
			}
		}
		model.addAttribute("categoryList", bbsFormulasService.getCategoryList("ja"));
		model.addAttribute("selectedName", name);
		return "bbs/newpost";
	}

	@GetMapping("/bbs/post")
	public String getPost(Model model,
			@RequestParam(value="postId")String postId
	) {
		BBSPost postData = bbsFormulasService.getPostOne(Integer.parseInt(postId));
		model.addAttribute("postData", postData);
		return "bbs/post";
	}

	@GetMapping("/bbs/post/update")
	public String getUpdatePost(
		Model model,
		@ModelAttribute BBSPostForm form,
		@RequestParam(value="postId")String postId,
		@AuthenticationPrincipal LoginUserDetails user
	) {
		BBSPost postData = bbsFormulasService.getPostOne(Integer.parseInt(postId));
		if(postData == null || user.getLoginUser().getId() != postData.getCreatorId()) {
			return "redirect:/bbs";
		}
		form.setPostId(postData.getId());
		form.setTitle(postData.getTitle());
		form.setCategory(postData.getCategoryId().toString());
		form.setComment(postData.getComment());
		model.addAttribute("categoryList", bbsFormulasService.getCategoryList("ja"));
		model.addAttribute("selectedName", "");
		return "bbs/updatepost";
	}
}
