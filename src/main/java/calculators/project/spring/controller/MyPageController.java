package calculators.project.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyPageController {
	@GetMapping("/mypage")
	public String getMyPage(Model model) {
		model.addAttribute("viewPage","top");
		return "mypage";
	}
}
