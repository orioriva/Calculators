package calculators.project.spring.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.form.ChangeUserStatusForm;
import calculators.project.spring.model.BBSPost;
import calculators.project.spring.model.Category;
import calculators.project.spring.model.Comment;
import calculators.project.spring.model.LoginUser;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.model.RestResult;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.CategoriesService;
import calculators.project.spring.service.CommentsService;
import calculators.project.spring.service.ErrorCheckService;
import calculators.project.spring.service.FormulasService;
import calculators.project.spring.service.UserService;

@RestController
public class RestAdminController {
	@Autowired
	private ErrorCheckService errorCheckService;

	@Autowired
	private UserService userService;

	@Autowired
	private FormulasService formulasService;

	@Autowired
	private BBSFormulasService bbsFormulasService;

	@Autowired
	private CommentsService commentsService;

	@Autowired
	private CategoriesService categoriesService;

	/** ユーザー一覧取得 */
	@GetMapping("/admin/rest/users")
	public List<LoginUser> restGetUserList(){
		return userService.getUserList();
	}

	/** ユーザー情報変更 */
	@PutMapping("/admin/rest/user")
	public RestResult restUpdateUser(
			@AuthenticationPrincipal LoginUserDetails user,
			@Validated ChangeUserStatusForm form,
			BindingResult bindingResult
	) {
		Map<String, String> errors = new HashMap<>();
		errorCheckService.setValidError(bindingResult, errors);
		if(form.getIsChange()) {
			errorCheckService.setNotMatchError(
				form.getPassword(), form.getConfirm(),
				new String[]{"password","confirm"},
				errors,
				"NotMatchNewPassword");
		}else {
			// パスワードを変更しないならパスワードのエラーは無視する
			errors.remove("password");
			errors.remove("confirm");
		}

		// エラーが見つかった場合
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}

		try {
			if(userService.updateUserStatus(form.toLoginUser())) {
				return new RestResult(0, null);
			}
		} catch (Exception e) {}

		return new RestResult(500, null);
	}

	/** ユーザー１件削除 */
	@DeleteMapping("/admin/rest/user")
	public RestResult restUpdateUser(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam Integer id
	) {
		// ここからは自身は削除出来ない
		if(user.getLoginUser().getId() == id) {
			return new RestResult(500, null);
		}
		formulasService.deleteFormulaAll(id);
		bbsFormulasService.hidePostAll(id);
		userService.deleteUser(id);
		return new RestResult(0, null);
	}

	/** 投稿一覧取得 */
	@GetMapping("/admin/rest/posts")
	public List<BBSPost> restGetPostList(){
		return bbsFormulasService.adminGetPostList();
	}

	/** 投稿１件更新 */
	@PutMapping("/admin/rest/posts")
	public RestResult restUpdatePost(BBSPost post) {
		if(!bbsFormulasService.adminUpdatePostOne(post))
			return new RestResult(500, null);
		return new RestResult(0, null);
	}

	/** 投稿１件削除 */
	@DeleteMapping("/admin/rest/posts")
	public RestResult restDeletePostOne(Integer postId) {
		if(!bbsFormulasService.deletePostOne(postId))
			return new RestResult(500, null);
		commentsService.deleteComments(postId);
		return new RestResult(0, null);
	}

	/** コメント一覧取得 */
	@GetMapping("/admin/rest/comments")
	public List<Comment> getCommentList(){
		return commentsService.adminGetCommentList();
	}

	/** コメント１件表示非表示切り替え */
	@PutMapping("/admin/rest/comments/view")
	public RestResult changeCommentView(Integer postId, Integer no) {
		if(!commentsService.changeCommentView(postId, no))
			return new RestResult(500, null);
		return new RestResult(0, null);
	}

	/** カテゴリーリスト取得 */
	@GetMapping("/admin/rest/category")
	public List<Category> restGetCategoryList(){
		return categoriesService.getCategoryList(false);
	}

	/** カテゴリ追加 */
	@PostMapping("/admin/rest/category")
	public RestResult addCategory(String name) {
		if(categoriesService.addCategoryOne(name)) {
			return new RestResult(0, null);
		}
		return new RestResult(500, null);
	}

	/** カテゴリ名変更 */
	@PutMapping("/admin/rest/category")
	public RestResult updateCategoryName(Category category) {
		if(category.getId() <= 1) {
			return new RestResult(90, null);
		}
		if(categoriesService.updateCategoryOne(category)) {
			return new RestResult(0, null);
		}
		return new RestResult(500, null);
	}

	/** カテゴリ統合 */
	@DeleteMapping("/admin/rest/category")
	public RestResult integrationCategory(Integer beforeId, Integer afterId) {
		if(beforeId <= 1) {
			return new RestResult(90, null);
		}
		bbsFormulasService.changeCategory(beforeId, afterId);
		if(!categoriesService.deleteCategoryOne(beforeId)) {
			return new RestResult(500, null);
		}
		return new RestResult(0, null);
	}
}
