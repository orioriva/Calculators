package calculators.project.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import calculators.project.spring.form.LoginForm;

@Controller
public class LoginController {
	@GetMapping("/login")
	public String getLogin(@ModelAttribute LoginForm form) {
		return "login";
	}
}
