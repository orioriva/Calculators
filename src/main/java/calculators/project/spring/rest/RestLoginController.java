package calculators.project.spring.rest;

import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.form.LoginForm;
import calculators.project.spring.model.RestResult;

@RestController
public class RestLoginController {

	@PostMapping("/login/rest")
	public RestResult postRestLogin(Model model,
			@Validated LoginForm form,
			BindingResult bindingResult)
	{
		return null;
	}
}
