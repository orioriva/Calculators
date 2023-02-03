package calculators.project.spring.mapper;

import org.apache.ibatis.annotations.Mapper;

import calculators.project.spring.model.LoginUser;

@Mapper
public interface UserMapper {
	public LoginUser findUserOneUserId(String userId);
	public boolean addUserOne(LoginUser user);
	public boolean updateUserName(int id,String userName);
}
