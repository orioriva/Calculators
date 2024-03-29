package calculators.project.spring.controller.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.form.ChangeIdForm;
import calculators.project.spring.form.ChangePasswordForm;
import calculators.project.spring.form.ChangeUserNameForm;
import calculators.project.spring.form.ConfirmIdPasswordForm;
import calculators.project.spring.form.RegisterForm;
import calculators.project.spring.model.LoginUser;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.model.RestResult;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.ErrorCheckService;
import calculators.project.spring.service.FormulasService;
import calculators.project.spring.service.UserService;

@RestController
public class RestUserController {
	@Autowired
	private UserService userService;

	@Autowired
	private FormulasService formulasService;

	@Autowired
	private BBSFormulasService bbsFormulasService;

	@Autowired
	private ErrorCheckService errorCheck;

	@PostMapping("/rest/users")
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
			return new RestResult(500, null);
		}

		return new RestResult(0, null);
	}

	/** ユーザー名変更 */
	@PutMapping("/rest/users/name")
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
			return new RestResult(500, null);
		}
		user.getLoginUser().setUserName(form.getUserName());
		return new RestResult(0, null);
	}

	/** ＩＤ変更 */
	@PutMapping("/rest/users/id")
	public RestResult restResetId(
		@Validated ChangeIdForm form,
		BindingResult bindingResult,
		@AuthenticationPrincipal LoginUserDetails user
	) {
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);

		// 現在のＩＤ・パスワードが正しいか
		errorCheck.setNotMatchUserIdPasswordError(
			user.getLoginUser().getId(),form.getNowUserId(),form.getNowPassword(),
			new String[]{"nowUserId","nowPassword"},
			errors
		);

		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}
		// ID更新
		if(!userService.updateUserId(user.getLoginUser().getId(), form.getNowUserId(), form.getNewUserId())) {
			return new RestResult(500, null);
		}

		return new RestResult(0, null);
	}

	/** パスワード変更 */
	@PutMapping("/rest/users/password")
	public RestResult restResetPassword(
			@Validated ChangePasswordForm form,
			BindingResult bindingResult,
			@AuthenticationPrincipal LoginUserDetails user
	) {
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);

		// パスワード2種が一致しているか
		errorCheck.setNotMatchError(
				form.getNewPassword(), form.getNewPasswordConfirm(),
				new String[]{"newPassword","newPasswordConfirm"},
				errors,
				"NotMatchNewPassword");

		// 現在のパスワードが正しいか
		errorCheck.setNotMatchPasswordError(
				user.getLoginUser().getId(), user.getLoginUser().getUserId(),
				form.getNowPassword(),
				"nowPassword",
				errors);

		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}
		// パスワード更新
		if(!userService.updatePassword(user.getLoginUser().getId(), user.getLoginUser().getUserId(), form.getNewPassword())) {
			return new RestResult(500, null);
		}

		return new RestResult(0, null);
	}

	/** ユーザー削除 */
	@DeleteMapping("/rest/users")
	public RestResult restUnregister(@Validated ConfirmIdPasswordForm form,
			BindingResult bindingResult,
			@AuthenticationPrincipal LoginUserDetails user
	) {
		// 管理者は削除出来ない
		if(user.getLoginUser().getRole().equals("ROLE_ADMIN")) {
			return new RestResult(403,null);
		}

		Map<String, String> errors = new HashMap<>();
		int myId = user.getLoginUser().getId();
		errorCheck.setValidError(bindingResult, errors);
		// 現在のＩＤ・パスワードが正しいか
		errorCheck.setNotMatchUserIdPasswordError(myId, form.getNowUserId(), form.getNowPassword(), new String[]{"nowUserId","nowPassword"}, errors);
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}

		// 保存した計算表削除
		formulasService.deleteFormulaAll(myId);
		// 自身の投稿を論理削除（非表示）
		bbsFormulasService.hidePostAll(myId);
		// ユーザーデータ削除
		userService.deleteUser(myId);

		return new RestResult(0, null);
	}
}
