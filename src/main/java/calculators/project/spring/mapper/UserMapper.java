package calculators.project.spring.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.LoginUser;

@Mapper
public interface UserMapper {
	public List<LoginUser> getUserList();
	public LoginUser findUserOneUserId(String userId);
	public boolean addUserOne(LoginUser user);
	public boolean updateUserName(int id,String userName);
	public boolean updateUserIdPassword(int id, String nowUserId, String newUserId, String newPassword);
	public boolean updateUserStatus(LoginUser user);
	public boolean deleteUser(int id);
}
