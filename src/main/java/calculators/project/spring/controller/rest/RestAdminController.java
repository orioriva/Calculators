package calculators.project.spring.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import calculators.project.spring.model.LoginUser;
import calculators.project.spring.service.UserService;

@RestController
public class RestAdminController {
	@Autowired
	private UserService userService;

	/** ユーザー一覧取得 */
	@GetMapping("/admin/rest/users")
	public List<LoginUser> restGetUserList(){
		return userService.getUserList();
	}
}
