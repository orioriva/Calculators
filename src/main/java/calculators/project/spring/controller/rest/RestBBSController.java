package calculators.project.spring.controller.rest;

import java.util.Date;
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

import calculators.project.spring.form.BBSPostForm;
import calculators.project.spring.model.BBSPost;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.model.RestResult;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.ErrorCheckService;
import calculators.project.spring.service.FormulasService;

@RestController
public class RestBBSController {
	@Autowired
	private BBSFormulasService bbsFormulaService;

	@Autowired
	private FormulasService formulasService;

	@Autowired
	private ErrorCheckService errorCheck;

	/** 投稿一覧リスト取得 */
	@GetMapping("/rest/posts")
	public List<BBSPost> restGetPostList() {
		return bbsFormulaService.getPostList();
	}

	/** 自分の投稿一覧リスト取得 */
	@GetMapping("/rest/posts/myposts")
	public List<BBSPost> restGetMyPostList(@AuthenticationPrincipal LoginUserDetails user) {
		return bbsFormulaService.getPostList(user.getLoginUser().getId());
	}

	/** 新規投稿 */
	@PostMapping("/rest/posts")
	public RestResult restNewPost(
			@AuthenticationPrincipal LoginUserDetails user,
			@Validated BBSPostForm form,
			BindingResult bindingResult
	) {
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);
		// エラーが見つかった場合
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}

		// 投稿データ登録
		BBSPost post = new BBSPost();
		int userId = user.getLoginUser().getId();
		int formulaId = form.getPostFormula();
		post.setCategoryId(form.getCategory());
		post.setCreatorId(userId);
		post.setUpdateDate(new Date());
		post.setTitle(form.getTitle());
		post.setComment(form.getComment());
		post.setJsonData(formulasService.getJsonOne(userId, formulaId));
		bbsFormulaService.newPostOne(post);

		return new RestResult(0, null);
	}

	/** 投稿内容変更 */
	@PutMapping("/rest/posts")
	public RestResult restUpdatePost(
			@AuthenticationPrincipal LoginUserDetails user,
			@Validated BBSPostForm form,
			BindingResult bindingResult
	) {
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);
		// 計算表を変更しないなら計算表が指定されていないエラーは無視する
		if(errors.containsKey("postFormula") && form.getChangeFormula() == null) {
			errors.remove("postFormula");
		}
		// エラーが見つかった場合
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}

		// 投稿データ登録
		BBSPost post = new BBSPost();
		int userId = user.getLoginUser().getId();
		post.setId(form.getPostId());
		post.setCreatorId(userId);
		post.setCategoryId(form.getCategory());
		post.setUpdateDate(new Date());
		post.setTitle(form.getTitle());
		post.setComment(form.getComment());

		if(form.getChangeFormula() != null) {
			System.out.println(form.getPostFormula());
			int formulaId = form.getPostFormula();
			post.setJsonData(formulasService.getJsonOne(userId, formulaId));
		}else {
			post.setJsonData(null);
		}

		bbsFormulaService.updatePostOne(post);

		return new RestResult(0, null);
	}

	/** 投稿を論理削除 */
	@DeleteMapping("/rest/posts")
	public boolean restDeletePost(
		@AuthenticationPrincipal LoginUserDetails user,
		@RequestParam int id
	) {
		return bbsFormulaService.hidePostOne(id, user.getLoginUser().getId());
	}
}
