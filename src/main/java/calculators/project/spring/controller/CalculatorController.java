package calculators.project.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import calculators.project.spring.service.BBSFormulasService;
import calculators.project.spring.service.FormulasService;

@Controller
public class CalculatorController {
	@Autowired
	private FormulasService formulasService;

	@Autowired
	private BBSFormulasService bbsFormulaService;

	@GetMapping("/calculator")
	public String getCalculator() {
		return "calculator";
	}
}
