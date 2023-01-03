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

			// エラー結果の返却
			return;
		}

		return;
	}
	
	/** 同じユーザーIDが存在しているかチェック */
	public void setSameUserIdError(String userId, String errorKey, Map<String, String> errors) {
		if(userService.existsUserId(userId)) {
			// エラー結果の追加
			String message = messageSource.getMessage("ExistsUserId", null, Locale.JAPAN);
			errors.put(errorKey, message);
		}
		return;
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
}
