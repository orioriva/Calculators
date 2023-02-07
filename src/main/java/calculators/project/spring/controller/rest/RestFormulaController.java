package calculators.project.spring.controller.rest;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.model.Formula;
import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.service.FormulasService;

@RestController
public class RestFormulaController {
	@Autowired
	private FormulasService formulasService;

	/** 一覧表示処理 */
	@GetMapping("/rest/formulas")
	public List<Formula> postGetFormulaList(
			@AuthenticationPrincipal LoginUserDetails user
	){
		return formulasService.getFormulaList(user.getLoginUser().getId());
	}

	/** 新規保存処理 */
	@PostMapping("/rest/formulas")
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

		if(!formulasService.addFormulaOne(formula)) {
			return 999;
		}

		return 0;
	}

	/** 計算表データ取得（json） */
	@GetMapping("/rest/formulas/json")
	public String postLoadFormula(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam int formulaId
	) {
		return formulasService.getJsonOne(user.getLoginUser().getId(), formulaId);
	}

	/** 計算表データ１件削除 */
	@DeleteMapping("/rest/formulas")
	public int postDeleteFormula(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam int formulaId) {
		if(!formulasService.deleteFormulaOne(user.getLoginUser().getId(), formulaId)) {
			return 999;
		}
		return 0;
	}

	/** 計算表データ１件更新(json) */
	@PutMapping("/rest/formulas/json")
	public int postUpdateFormulaJson(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam int formulaId,
			@RequestParam String json
	) {
		try {
			Formula formula = formulasService.getFormulaOne(
					user.getLoginUser().getId(),
					formulaId);
			formula.setJsonData(json);
			formula.setUpdateDate(new Date());
			formulasService.updateFormulaOne(formula);
		}catch (Exception e) {
			return 999;
		}
		return 0;
	}

	/** 計算表データ１件更新(タイトル名) */
	@PutMapping("/rest/formulas/title")
	public int postUpdateFormulaTitle(
			@AuthenticationPrincipal LoginUserDetails user,
			@RequestParam int formulaId,
			@RequestParam String title
	) {
		try {
			Formula formula = formulasService.getFormulaOne(
					user.getLoginUser().getId(),
					formulaId);
			formula.setTitle(title);
			formulasService.updateFormulaOne(formula);
		}catch (Exception e) {
			return 999;
		}
		return 0;
	}
}
