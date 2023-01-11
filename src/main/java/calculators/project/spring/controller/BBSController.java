package calculators.project.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BBSController {
	@GetMapping("/bbs")
	public String getBBS() {
		return "bbs/bbs";
	}

	@GetMapping("/bbs/newpost")
	public String getNewPost() {
		return "bbs/newpost";
	}
}
