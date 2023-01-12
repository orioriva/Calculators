package calculators.project.spring.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.form.BBSPostForm;
import calculators.project.spring.model.RestResult;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.ErrorCheckService;

@RestController
public class RestBBSController {
	@Autowired
	private BBSFormulasService bbsFormulaService;

	@Autowired
	private ErrorCheckService errorCheck;

	/** 新規投稿 */
	@PostMapping("/bbs/newpost/rest")
	public RestResult restNewPost(
			@Validated BBSPostForm form,
			BindingResult bindingResult
	) {
		Map<String, String> errors = new HashMap<>();
		errorCheck.setValidError(bindingResult, errors);
		// エラーが見つかった場合
		if(!errors.isEmpty()) {
			return new RestResult(90, errors);
		}

		return new RestResult(0, null);
	}
}
