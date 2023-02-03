package calculators.project.spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import calculators.project.spring.mapper.UserMapper;
import calculators.project.spring.model.LoginUser;

@Service
public class UserService {
	@Autowired
	private UserMapper mapper;

	@Autowired
	private PasswordEncoder encoder;

	/** ユーザーIDからユーザー情報を１件取得 */
	public LoginUser findUserOneUserId(String userId) {
		return mapper.findUserOneUserId(userId);
	}
	/** 同じユーザーIDが存在するか */
	public boolean existsUserId(String userId) {
		return mapper.findUserOneUserId(userId) != null;
	}
	/** ユーザーを１名登録 */
	public boolean addUserOne(LoginUser user) {
		String encodePass = encoder.encode(user.getPassword());
		user.setPassword(encodePass);
		return mapper.addUserOne(user);
	}
	/** ユーザー名を変更 */
	public boolean updateUserName(int id,String userName){
		return mapper.updateUserName(id, userName);
	}
}
