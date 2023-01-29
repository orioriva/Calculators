package calculators.project.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import calculators.project.spring.form.BBSPostForm;
import calculators.project.spring.model.BBSPost;
import calculators.project.spring.service.BBSFormulasService;

@Controller
public class BBSController {
	@Autowired
	private BBSFormulasService bbsFormulasService;
	
	@GetMapping("/bbs")
	public String getBBS() {
		return "bbs/bbs";
	}

	@GetMapping("/bbs/newpost")
	public String getNewPost(
			Model model,
			@ModelAttribute BBSPostForm form
	) {
		model.addAttribute("categoryMap", bbsFormulasService.getCategoryMap());
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
	public String getUpdatePost() {
		return "bbs/updatepost";
	}

	@PostMapping("/bbs/newpost")
	public String postNewPost() {
		return "redirect:/bbs";
	}
}
