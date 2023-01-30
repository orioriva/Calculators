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
			@RequestParam(value="openMine", defaultValue="")String formulaId,
			@RequestParam(value="openBBS", defaultValue="")String bbsFormulaId,
			@AuthenticationPrincipal LoginUserDetails user
	) {
		String jsonData = "";
		try {
			if(user != null && !formulaId.isEmpty()) {
				jsonData = formulasService.getJsonOne(user.getLoginUser().getId(), Integer.parseInt(formulaId));
			}else if(!bbsFormulaId.isEmpty()) {
				jsonData = bbsFormulaService.getJsonOne(Integer.parseInt(bbsFormulaId));
			}
		}catch (Exception e) {}

		model.addAttribute("jsonData", jsonData);
		return "calculator";
	}
}
