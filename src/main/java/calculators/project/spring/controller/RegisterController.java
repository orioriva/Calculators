package calculators.project.spring.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import calculators.project.spring.form.RegisterForm;
import calculators.project.spring.model.LoginUserDetails;

@Controller
public class RegisterController {
	@GetMapping("/register")
	public String getRegister(
			@AuthenticationPrincipal LoginUserDetails user,
			@ModelAttribute RegisterForm form)
	{
		if(user != null) {
			return "redirect:/";
		}
		return "register";
	}

	@PostMapping("/register")
	public String postRegister(Model model,
			@ModelAttribute RegisterForm form)
	{
		return "login";
	}
}
