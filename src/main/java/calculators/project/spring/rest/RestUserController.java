package calculators.project.spring.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.form.ChangeIdPasswordForm;
import calculators.project.spring.form.ChangeUserNameForm;
import calculators.project.spring.form.RegisterForm;
import calculators.project.spring.model.LoginUser;
import calculators.project.spring.model.LoginUserDetails;
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

	/** ユーザー名変更 */
	@PostMapping("/mypage/userSettings/rename/rest")
	public RestResult restRename(
		@Validated ChangeUserNameForm form,
		BindingResult bindingResult,
		@AuthenticationPrincipal LoginUserDetails user
	) {
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}
		if(!userService.updateUserName(user.getLoginUser().getId(), form.getUserName())) {
			return new RestResult(999, null);
		}
		user.getLoginUser().setUserName(form.getUserName());
		return new RestResult(0, null);
	}
	
	/** ＩＤ・パスワード変更 */
	@PostMapping("/mypage/userSettings/resetIdPassword/rest")
	public RestResult restResetIdPassword(
		@Validated ChangeIdPasswordForm form,
		BindingResult bindingResult,
		@AuthenticationPrincipal LoginUserDetails user
	) {
		if(form.getChangeId() == null && form.getChangePassword() == null) {
			return new RestResult(404, null);
		}
		
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);
		
		String newUserId = null;
		String newPassword = null;
		
		// IDを変更しないならＩＤエラー無視
		if(form.getChangeId() == null)
			errorCheck.removeErrorKey(errors, new String[]{"newUserId","newUserIdConfirm"});
		else {
			newUserId = form.getNewUserId();
			// ID2種が一致しているか
			errorCheck.setNotMatchError(newUserId, form.getNewUserIdConfirm(), new String[]{"newUserId","newUserIdConfirm"}, errors, "NotMatchNewUserId");
		}
		// パスワード変更しないならパスワードエラー無視
		if(form.getChangePassword() == null)
			errorCheck.removeErrorKey(errors, new String[]{"newPassword","newPasswordConfirm"});
		else {
			newPassword = form.getNewPassword();
			// パスワード2種が一致しているか
			errorCheck.setNotMatchError(newPassword, form.getNewPasswordConfirm(), new String[]{"newPassword","newPasswordConfirm"}, errors, "NotMatchNewPassword");
		}
		// 現在のＩＤ・パスワードが正しいか
		errorCheck.setNotMatchUserIdPasswordError(user.getLoginUser().getId(), form.getNowUserId(), form.getNowPassword(), new String[]{"nowUserId","nowPassword"}, errors);
		
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}
		if(!userService.updateUserIdPassword(user.getLoginUser().getId(), form.getNowUserId(), newUserId, newPassword)) {
			return new RestResult(500, null);
		}
		
		return new RestResult(0, null);
	}
}
