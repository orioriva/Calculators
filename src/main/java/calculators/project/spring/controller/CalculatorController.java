package calculators.project.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CalculatorController {
	@GetMapping("/calculator")
	public String getCalculator(Model model) {
		//model.addAttribute("jsonData","[{\"type\":\"number\",\"x\":436.6040570999249,\"y\":239.9349593495935,\"tag\":\"NEW\",\"number\":5,\"calcSource\":null,\"nextObj\":[1],\"prevObj\":[]},{\"type\":\"sign\",\"x\":514.2271039749248,\"y\":239.9349593495935,\"typeText\":\"+\",\"nextObj\":[2],\"prevObj\":[0]},{\"type\":\"number\",\"x\":629.2271039749248,\"y\":239.9349593495935,\"tag\":\"NEW\",\"number\":5,\"calcSource\":null,\"nextObj\":[4],\"prevObj\":[1]},{\"type\":\"number\",\"x\":793.2298318933132,\"y\":335.0243902439024,\"tag\":\"NEW ＋ NEW\",\"number\":\"10\",\"calcSource\":1},{\"type\":\"sign\",\"x\":631.8388811279112,\"y\":336.130081300813,\"typeText\":\"+\",\"nextObj\":[],\"prevObj\":[2]},{\"type\":\"pointer\",\"x\":771.8501508499248,\"y\":239.9349593495935,\"parent\":4}]");
		model.addAttribute("jsonData","");
		return "calculator";
	}
}
