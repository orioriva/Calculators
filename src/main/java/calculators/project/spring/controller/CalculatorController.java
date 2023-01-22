package calculators.project.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.FormulaService;

@Controller
public class CalculatorController {
	@Autowired
	private FormulaService formulaService;
	
	@Autowired
	private BBSFormulasService bbsFormulaService;

	@GetMapping("/calculator")
	public String getCalculator(
			Model model,
			@RequestParam(value="openMine", defaultValue="")String formulaId,
			@RequestParam(value="openBBS", defaultValue="")String bbsFormulaId,
			@AuthenticationPrincipal LoginUserDetails user
	) {
		String jsonData = "";
		try {
			if(user != null && formulaId != "") {
				jsonData = formulaService.getJsonOne(user.getLoginUser().getId(), Integer.parseInt(formulaId));
			}else if(bbsFormulaId != "") {
				jsonData = bbsFormulaService.getJsonOne(Integer.parseInt(bbsFormulaId));
			}
		}catch (Exception e) {}

		model.addAttribute("jsonData", jsonData);
		return "calculator";
	}
}
