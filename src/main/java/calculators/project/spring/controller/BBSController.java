package calculators.project.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import calculators.project.spring.form.BBSPostForm;
import calculators.project.spring.service.FormulaService;

@Controller
public class BBSController {
	@Autowired
	private FormulaService formulaService;

	@GetMapping("/bbs")
	public String getBBS() {
		return "bbs/bbs";
	}

	@GetMapping("/bbs/newpost")
	public String getNewPost(@ModelAttribute BBSPostForm form) {
		return "bbs/newpost";
	}

	@PostMapping("/bbs/newpost")
	public String postNewPost() {
		return "redirect:/bbs";
	}
}
