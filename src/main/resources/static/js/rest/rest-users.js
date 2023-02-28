'use strict'

/** バリデーション結果の反映 */
function reflectValidResult(key, value){
	// CSS適用
	$('input[id=' + key +']').addClass('is-invalid');
	// エラーメッセージ追加
	$('input[id=' + key +']').parent().append('<div class="text-danger">' + value + '</div>');
}
function reflectValidResultName(parent, name, value){
	// CSS適用
	let target = parent.find('input[name=' + name +']');
	target.addClass('is-invalid');
	// エラーメッセージ追加
	target.parent().append('<div class="text-danger">' + value + '</div>');
}

/** ユーザー登録 */
function ajaxAddUser(){
	if(!confirm("この内容で登録してよろしいですか？")){
		return false;
	}

	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	const formData = $('#input-form').serializeArray();

	setAjax(
		'POST',
		'/rest/users',
		formData,
		function(data){
			if(data.result == 90){
				// validationエラー時の処理
				$.each(data.errors, function(key, value){
					reflectValidResult(key, value)
				});
			}else if(data.result == 0){
				// 入力情報を送信
				alert("登録完了しました");
				window.location.href= '/login';
			}else{
				errorCodeCheck(data.result);
			}
		}
	);

	return false;
}

/** ユーザー名変更 */
function ajaxRename(){
	if(!confirm("本当に変更してよろしいですか？")){
		return false;
	}

	removeValidResult();

	const formData = $('#changeUserNameForm').serializeArray();

	setAjax(
		'PUT',
		'/rest/users/name',
		formData,
		function(data){
			if(data.result == 90){
				// validationエラー時の処理
				$.each(data.errors, function(key, value){
					reflectValidResult(key, value)
				});
			}else if(data.result == 0){
				alert("ユーザー名を変更しました");
				window.location.reload();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);

	return false;
}

/** ID変更 */
function ajaxChangeId(){
	if(!confirm("本当に変更してよろしいですか？\r\n※　変更後にログアウトされます")){
		return false;
	}

	removeValidResult();

	const formData = $('#changeIdForm').serializeArray();

	setAjax(
		'PUT',
		'/rest/users/id',
		formData,
		function(data){
			if(data.result == 90){
				// validationエラー時の処理
				$.each(data.errors, function(key, value){
					reflectValidResultName($('#changeIdForm'), key, value)
				});
			}else if(data.result == 0){
				alert("ＩＤを更新しました");
				$('#logoutForm').submit();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);

	return false;
}

/** パスワード変更 */
function ajaxChangePassword(){
	if(!confirm("本当に変更してよろしいですか？\r\n※　変更後にログアウトされます")){
		return false;
	}

	removeValidResult();

	const formData = $('#changePasswordForm').serializeArray();

	setAjax(
		'PUT',
		'/rest/users/password',
		formData,
		function(data){
			if(data.result == 90){
				// validationエラー時の処理
				$.each(data.errors, function(key, value){
					reflectValidResultName($('#changePasswordForm'), key, value)
				});
			}else if(data.result == 0){
				alert("パスワードを更新しました");
				$('#logoutForm').submit();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);

	return false;
}

/** ユーザー削除 */
function ajaxDeleteUser(){
	if(!confirm("本当に登録解除してよろしいですか？\r\n※　ユーザーデータ削除後にログアウトされます")){
		return false;
	}

	removeValidResult();

	const formData = $('#unregisterForm').serializeArray();

	setAjax(
		'DELETE',
		'/rest/users',
		formData,
		function(data){
			if(data.result == 90){
				// validationエラー時の処理
				$.each(data.errors, function(key, value){
					reflectValidResult(key, value)
				});
			}else if(data.result == 0){
				alert("登録情報を削除いたしました。");
				$('#logoutForm').submit();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);

	return false;
}
