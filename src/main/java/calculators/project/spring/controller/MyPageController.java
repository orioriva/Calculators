package calculators.project.spring.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import calculators.project.spring.form.ChangeIdPasswordForm;
import calculators.project.spring.form.ChangeUserNameForm;
import calculators.project.spring.form.ConfirmIdPasswordForm;
import calculators.project.spring.model.LoginUserDetails;

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

	@GetMapping("/mypage/userSettings")
	public String getMyPageUserSettings(Model model,
		@ModelAttribute ChangeUserNameForm userNameForm,
		@ModelAttribute ChangeIdPasswordForm idpassForm,
		@ModelAttribute ConfirmIdPasswordForm confirmForm,
		@AuthenticationPrincipal LoginUserDetails user
	) {
		userNameForm.setUserName(user.getUserViewName());
		model.addAttribute("viewPage","userSettings");
		return "mypage";
	}
}
