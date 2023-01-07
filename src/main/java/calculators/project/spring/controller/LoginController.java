package calculators.project.spring.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import calculators.project.spring.model.LoginUserDetails;

@Controller
public class LoginController {
	@GetMapping("/login")
	public String getLogin(@AuthenticationPrincipal LoginUserDetails user) {
		if(user != null) {
			return "redirect:/";
		}
		return "login";
	}
}
