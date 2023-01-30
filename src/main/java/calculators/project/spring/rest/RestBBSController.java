package calculators.project.spring.rest;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
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

	@PostMapping("/bbs/rest")
	public List<BBSPost> restGetPostList() {
		return bbsFormulaService.getPostList();
	}

	/** 新規投稿 */
	@PostMapping("/bbs/newpost/rest")
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
		int formulaId = Integer.parseInt(form.getPostFormula());
		post.setCategory(form.getCategory());
		post.setCreatorId(userId);
		post.setUpdateDate(new Date());
		post.setTitle(form.getTitle());
		post.setComment(form.getComment());
		post.setJsonData(formulasService.getJsonOne(userId, formulaId));
		bbsFormulaService.newPostOne(post);

		return new RestResult(0, null);
	}

	/** 投稿内容変更 */
	@PostMapping("/bbs/post/update/rest")
	public RestResult restUpdatePost(
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
		post.setCategory(form.getCategory());
		post.setUpdateDate(new Date());
		post.setTitle(form.getTitle());
		post.setComment(form.getComment());

		/* jsonDataを変更するなら新しいjsonDataを入れるようにする
		int userId = user.getLoginUser().getId();
		int formulaId = Integer.parseInt(form.getPostFormula());
		post.setJsonData(formulasService.getJsonOne(userId, formulaId));
		*/
		bbsFormulaService.updatePostOne(post);

		return new RestResult(0, null);
	}
}
