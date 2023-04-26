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
import org.springframework.web.bind.annotation.PathVariable;
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
	private BBSFormulasService bbsFormulasService;

	@Autowired
	private FormulasService formulasService;

	@Autowired
	private ErrorCheckService errorCheck;

	// 投稿フォームに入力された内容をデータベース登録用のクラスに変換
	private BBSPost formToPost(BBSPostForm form, int userId) {
		BBSPost post = new BBSPost();
		post.setCategoryId(form.getCategory());
		post.setCreatorId(userId);
		post.setUpdateDate(new Date());
		post.setTitle(form.getTitle());
		post.setComment(form.getComment());
		post.setJsonData(formulasService.getJsonOne(userId, form.getPostFormula()));
		return post;
	}
	// 更新の場合
	private BBSPost formToUpdatePost(BBSPostForm form, int userId) {
		BBSPost post = formToPost(form, userId);
		post.setId(form.getPostId());
		if(form.getChangeFormula() == null) {
			post.setJsonData(null);
		}
		return post;
	}

	/** 投稿一覧リスト取得 */
	@GetMapping("/rest/posts")
	public List<BBSPost> restGetPostList() {
		return bbsFormulasService.getPostList();
	}

	/** 自分の投稿一覧リスト取得 */
	@GetMapping("/rest/posts/myposts")
	public List<BBSPost> restGetMyPostList(@AuthenticationPrincipal LoginUserDetails user) {
		return bbsFormulasService.getPostList(user.getLoginUser().getId());
	}

	/** 投稿内容１件取得 */
	@GetMapping("/rest/posts/{postId}")
	public BBSPost restGetPost(
			@AuthenticationPrincipal LoginUserDetails user,
			@PathVariable("postId") Integer postId
	) {
		BBSPost postData = bbsFormulasService.getPostOne(postId);
		if(postData == null)
			postData = new BBSPost();
		return postData;
	}

	/** 自分の投稿内容１件取得 */
	@GetMapping("/rest/posts/mypost")
	public BBSPost restGetMyPost(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam(value="postId")Integer postId) {
		BBSPost post = bbsFormulasService.getPostOne(postId);
		if(post.getCreatorId() != user.getLoginUser().getId()) {
			return null;
		}
		return post;
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
		BBSPost post = formToPost(form, user.getLoginUser().getId());
		if(!bbsFormulasService.newPostOne(post)) {
			return new RestResult(500, null);
		}

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
		BBSPost post = formToUpdatePost(form, user.getLoginUser().getId());
		if(!bbsFormulasService.updatePostOne(post)) {
			return new RestResult(500, null);
		}

		return new RestResult(0, null);
	}

	/** 投稿を論理削除 */
	@DeleteMapping("/rest/posts")
	public boolean restDeletePost(
		@AuthenticationPrincipal LoginUserDetails user,
		@RequestParam int id
	) {
		return bbsFormulasService.hidePostOne(id, user.getLoginUser().getId());
	}
}
