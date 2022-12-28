package calculators.project.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CalculatorController {
	@GetMapping("/calculator")
	public String getCalculator() {
		return "calculator";
	}
}
