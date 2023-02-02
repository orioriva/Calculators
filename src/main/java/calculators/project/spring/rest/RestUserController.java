package calculators.project.spring.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.form.RegisterForm;
import calculators.project.spring.model.LoginUser;
import calculators.project.spring.model.RestResult;
import calculators.project.spring.service.ErrorCheckService;
import calculators.project.spring.service.UserService;

@RestController
public class RestUserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ErrorCheckService errorCheck;
	
	@PostMapping("/register/rest")
	public RestResult restRegister(@Validated RegisterForm form,
			BindingResult bindingResult) 
	{
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);
		errorCheck.setSameUserIdError(form.getUserId(), "userId", errors);
		// エラーが見つかった場合
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}

		// ユーザー登録
		LoginUser user = new LoginUser();
		user.setUserName(form.getUserName());
		user.setUserId(form.getUserId());
		user.setPassword(form.getPassword());
		if(!userService.addUserOne(user)) {
			return new RestResult(999, null);
		}
		
		return new RestResult(0, null);
	}
}
