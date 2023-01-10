package calculators.project.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import calculators.project.spring.model.LoginUserDetails;
import calculators.project.spring.service.FormulaService;

@Controller
public class CalculatorController {
	@Autowired
	FormulaService formulaService;

	@GetMapping("/calculator")
	public String getCalculator(
			Model model,
			@RequestParam(value="openMine", defaultValue="")String formulaId,
			@RequestParam(value="openBBS", defaultValue="")String bbsFormulaId,
			@AuthenticationPrincipal LoginUserDetails user
	) {
		try {
			if(user != null && formulaId != "") {
				String jsonData = formulaService.getJsonOne(user.getLoginUser().getId(), Integer.parseInt(formulaId));
				model.addAttribute("jsonData", jsonData);
				return "calculator";
			}
		}catch (Exception e) {}

		model.addAttribute("jsonData","");
		return "calculator";
	}
}
