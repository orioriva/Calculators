package calculators.project.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
	@GetMapping("/admin")
	public String getAdmin() {
		return "redirect:/admin/user";
	}
	@GetMapping("/admin/user")
	public String getAdminUser() {
		return "admin/admin-user";
	}
	@GetMapping("/admin/bbs")
	public String getAdminBBS() {
		return "admin/admin-bbs";
	}
	@GetMapping("/admin/comment")
	public String getAdminComment() {
		return "admin/admin-comment";
	}
	@GetMapping("/admin/category")
	public String getAdminCategory() {
		return "admin/admin-category";
	}
}
