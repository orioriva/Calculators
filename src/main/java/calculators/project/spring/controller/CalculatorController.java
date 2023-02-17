package calculators.project.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.FormulasService;

@Controller
public class CalculatorController {
	@Autowired
	private FormulasService formulasService;

	@Autowired
	private BBSFormulasService bbsFormulaService;

	@GetMapping("/calculator")
	public String getCalculator(
			Model model,
			@RequestParam(value="openMine", defaultValue="0")Integer formulaId,
			@RequestParam(value="openBBS", defaultValue="0")Integer bbsFormulaId,
			@AuthenticationPrincipal LoginUserDetails user
	) {
		String jsonData = "";
		try {
			if(user != null && formulaId != 0) {
				jsonData = formulasService.getJsonOne(user.getLoginUser().getId(), formulaId);
			}else if(bbsFormulaId != 0) {
				jsonData = bbsFormulaService.getJsonOne(bbsFormulaId);
			}
		}catch (Exception e) {}

		model.addAttribute("jsonData", jsonData);
		return "calculator";
	}
}
