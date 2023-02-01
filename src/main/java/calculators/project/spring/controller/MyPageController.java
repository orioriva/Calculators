package calculators.project.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyPageController {
	@GetMapping("/mypage")
	public String getMyPage() {
		return "redirect:/mypage/top";
	}

	@GetMapping("/mypage/top")
	public String getMyPageTop(Model model) {
		model.addAttribute("viewPage","top");
		return "mypage";
	}

	@GetMapping("/mypage/formulas")
	public String getMyPageFormulas(Model model) {
		model.addAttribute("viewPage","formulas");
		return "mypage";
	}

	@GetMapping("/mypage/posts")
	public String getMyPagePosts(Model model) {
		model.addAttribute("viewPage","posts");
		return "mypage";
	}
}
