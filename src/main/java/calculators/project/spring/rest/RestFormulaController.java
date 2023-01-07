package calculators.project.spring.rest;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.model.Formula;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.service.FormulaService;

@RestController
public class RestFormulaController {
	@Autowired
	private FormulaService formulaService;

	/** 一覧表示処理 */
	@PostMapping("/mypage/formulas/rest")
	public List<Formula> postGetFormulaList(
			@AuthenticationPrincipal LoginUserDetails user
	){
		return formulaService.getFormulaList(user.getLoginUser().getId());
	}

	/** 新規保存処理 */
	@PostMapping("/mypage/formulas/add/rest")
	public int postAddFormula(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam String title,
			@RequestParam String json)
	{
		Formula formula = new Formula(
				user.getLoginUser().getId(),
				new Date(),
				title,
				json);

		if(!formulaService.addFormulaOne(formula)) {
			return 999;
		}

		return 0;
	}

	/** 計算表データ取得（json） */
	@PostMapping("/mypage/formulas/load/rest")
	public String postLoadFormula(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam int formulaId
	) {
		return formulaService.getJsonOne(user.getLoginUser().getId(), formulaId);
	}

	/** 計算表データ１件削除 */
	@PostMapping("/mypage/formulas/delete/rest")
	public int postDeleteFormula(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam int formulaId) {
		if(!formulaService.deleteFormulaOne(user.getLoginUser().getId(), formulaId)) {
			return 999;
		}
		return 0;
	}

	/** 計算表データ１件更新 */
	@PostMapping("/mypage/formulas/update/rest")
	public int postUpdateFormula(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam int formulaId,
			@RequestParam String json
	) {
		try {
			Formula formula = formulaService.getFormulaOne(
					user.getLoginUser().getId(),
					formulaId);
			formula.setJsonData(json);
			formula.setUpdateDate(new Date());
			formulaService.updateFormulaOne(formula);
		}catch (Exception e) {
			return 999;
		}
		return 0;
	}
}
