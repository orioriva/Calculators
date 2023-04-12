package calculators.project.spring.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.form.ChangeUserStatusForm;
import calculators.project.spring.model.LoginUser;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.model.RestResult;
import calculators.project.spring.service.ErrorCheckService;
import calculators.project.spring.service.UserService;

@RestController
public class RestAdminController {
	@Autowired
	private ErrorCheckService errorCheckService;

	@Autowired
	private UserService userService;

	/** ユーザー一覧取得 */
	@GetMapping("/admin/rest/users")
	public List<LoginUser> restGetUserList(){
		return userService.getUserList();
	}

	/** ユーザー情報変更 */
	@PutMapping("/admin/rest/user/update")
	public RestResult restUpdateUser(
			@AuthenticationPrincipal LoginUserDetails user,
			@Validated ChangeUserStatusForm form,
			BindingResult bindingResult
	) {
		Map<String, String> errors = new HashMap<>();
		errorCheckService.setValidError(bindingResult, errors);
		// パスワードを変更しないならパスワードのエラーは無視する
		if(!form.getIsChange()) {
			errors.remove("password");
			errors.remove("confirm");
		}

		// エラーが見つかった場合
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}

		return new RestResult(0, null);
	}
}
