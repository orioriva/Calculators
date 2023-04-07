package calculators.project.spring.service;

import java.util.List;

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

	/** ユーザー情報一覧取得 */
	public List<LoginUser> getUserList() {
		return mapper.getUserList();
	}
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
	/** 指定されたユーザーＩＤとパスワードが現在のものと等しいか？ */
	public boolean equalsUserIdPassword(int id, String userId, String password) {
		LoginUser user = mapper.findUserOneUserId(userId);
		if(user == null)
			return false;
		return (user.getId() == id &&
				user.getUserId().equals(userId) &&
				encoder.matches(password, user.getPassword())
				);
	}
	/** ユーザーＩＤ更新 */
	public boolean updateUserId(int id, String nowUserId, String newUserId) {
		return updateUserIdPassword(id, nowUserId, newUserId, null);
	}
	/** パスワード更新 */
	public boolean updatePassword(int id, String nowUserId, String newPassword) {
		return updateUserIdPassword(id, nowUserId, null, newPassword);
	}
	/** ユーザーＩＤとパスワード更新 */
	public boolean updateUserIdPassword(int id, String nowUserId, String newUserId, String newPassword) {
		String encodePass = (newPassword == null) ? null : encoder.encode(newPassword);
		return mapper.updateUserIdPassword(id, nowUserId, newUserId, encodePass);
	}
	/** ユーザー１件削除 */
	public boolean deleteUser(int id) {
		return mapper.deleteUser(id);
	}
}
