package calculators.project.spring.service;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@Service
public class ErrorCheckService {
	@Autowired
	private UserService userService;
	
	@Autowired
	private MessageSource messageSource;
	
	/** バリデーションエラーがあるかのチェック */
	public void setValidError(BindingResult bindingResult, Map<String, String> errors) {
		// エラーチェック
		if(bindingResult.hasErrors()) {
			// 入力エラーが見つかった場合
			// エラーメッセージ取得
			for(FieldError error: bindingResult.getFieldErrors()) {
				String message = messageSource.getMessage(error, Locale.JAPAN);
				errors.put(error.getField(), message);
			}
		}
	}
	
	/** 同じユーザーIDが存在しているかチェック */
	public void setSameUserIdError(String userId, String errorKey, Map<String, String> errors) {
		if(userService.existsUserId(userId)) {
			// エラー結果の追加
			String message = messageSource.getMessage("ExistsUserId", null, Locale.JAPAN);
			errors.put(errorKey, message);
		}
	}
	
	/** 新しいパスワード２つが同じ値であるかチェック */
	public void setNotMatchError(String pass1, String pass2, String[] errorKeys, Map<String, String> errors, String MessageKey) {
		if(pass1.equals(pass2)) {
			return;
		}
		String message = messageSource.getMessage(MessageKey, null, Locale.JAPAN);
		for (String key : errorKeys) {
			errors.put(key, message);
		}
	}
	
	/** 指定されたユーザーＩＤとパスワードが現在のものと等しいか？ */
	public void setNotMatchUserIdPasswordError(int id, String userId, String password, String[] errorKeys, Map<String, String> errors) {
		if(!userService.equalsUserIdPassword(id, userId, password)) {
			String message = messageSource.getMessage("NotMatchUserIdPass", null, Locale.JAPAN);
			for (String key : errorKeys) {
				errors.put(key, message);
			}
		}
	}

	/** エラーの並び順を指定された順番に変更 */
	public Map<String, String> sortErrorMap(Map<String, String> errors, String[] order){
		Map<String, String> sortErrors = new LinkedHashMap<>();

		// 指定順にmapに追加
		for(String key: order) {
			String value = errors.get(key);
			if(value != null) {
				sortErrors.put(key, value);
				errors.remove(key);
			}
		}
		// 指定以外にもまだ残っているなら追加する
		for(Iterator<String> itr = errors.keySet().iterator(); itr.hasNext();) {
			String key = itr.next();
			sortErrors.put(key, errors.get(key));
        }

		return sortErrors;
	}
	
	/** Mapの該当データを削除 */
	public void removeErrorKey(Map<String, String> errors, String[] removeKey) {
		for (String key : removeKey) {
			if(errors.containsKey(key)) {
				errors.remove(key);
			}
		}
	}
	public void removeErrorKey(Map<String, String> errors, String removeKey) {
		String key[] = {removeKey};
		removeErrorKey(errors,key);
	}
}
