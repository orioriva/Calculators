'use strict'

/** バリデーション結果をクリア */
function removeValidResult(){
	$('.is-invalid').removeClass('is-invalid');
	$('.invalid-feedback').remove();
	$('.text-danger').remove();
}

/** バリデーション結果の反映 */
function reflectValidResult(key, value){
	// CSS適用
	$('input[id=' + key +']').addClass('is-invalid');
	// エラーメッセージ追加
	$('input[id=' + key +']').parent().append('<div class="text-danger">' + value + '</div>');
}

/** ユーザー登録 */
function ajaxAddUser(){
	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	var formData = $('#input-form').serializeArray();

	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/rest/users',
		data : formData,
		dataType : 'json',
	}).done(function(data){
		if(data.result == 90){
			// validationエラー時の処理
			$.each(data.errors, function(key, value){
				reflectValidResult(key, value)
			});
		}else if(data.result == 999){
			alert("データベースへの追加に失敗しました");
		}else if(data.result == 0){
			// 入力情報を送信
			alert("登録完了しました");
			window.location.href= '/login';
		}else{
			alert("想定外のエラーが発生しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});

	return false;
}

/** ユーザー名変更 */
function ajaxRename(){
	removeValidResult();

	$.ajax({
		type : "PUT",
		cache : false,
		url : '/rest/users/name',
		data : $('#changeUserNameForm').serializeArray(),
		dataType : 'json'
	}).done(function(data){
		removeValidResult();
		if(data.result == 90){
			// validationエラー時の処理
			$.each(data.errors, function(key, value){
				reflectValidResult(key, value)
			});
		}else if(data.result == 0){
			alert("ユーザー名を変更しました");
			window.location.reload();
		}else{
			alert("想定外のエラーが発生しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});

	return false;
}

/** ID変更 */
function ajaxChangeId(){
	if(!confirm("本当に変更してよろしいですか？\r\n※　変更後にログアウトされます")){
		return false;
	}

	removeValidResult();

	$.ajax({
		type : "PUT",
		cache : false,
		url : '/rest/users/id',
		data : $('#changeIdForm').serializeArray(),
		dataType : 'json'
	}).done(function(data){
		console.log(data);
		removeValidResult();
		if(data.result == 90){
			// validationエラー時の処理
			$.each(data.errors, function(key, value){
				reflectValidResult(key, value)
			});
		}else if(data.result == 0){
			alert("ＩＤを更新しました");
			$('#logoutForm').submit();
		}else if(data.result == 500){
			alert("データの更新に失敗しました");
		}else{
			alert("想定外のエラーが発生しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});

	return false;
}

/** ＩＤ・パスワード変更 */
function ajaxChangeIdPassword(){
	if(!confirm("本当に変更してよろしいですか？\r\n※　変更後にログアウトされます")){
		return false;
	}

	removeValidResult();

	$.ajax({
		type : "PUT",
		cache : false,
		url : '/rest/users/id-password',
		data : $('#changeIdPasswordForm').serializeArray(),
		dataType : 'json'
	}).done(function(data){
		//console.log(data);
		removeValidResult();
		if(data.result == 90){
			// validationエラー時の処理
			$.each(data.errors, function(key, value){
				reflectValidResult(key, value)
			});
		}else if(data.result == 0){
			alert("ＩＤ・パスワードを更新しました");
			$('#logoutForm').submit();
		}else if(data.result == 500){
			alert("データの更新に失敗しました");
		}else{
			alert("想定外のエラーが発生しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});

	return false;
}

/** ユーザー削除 */
function ajaxDeleteUser(){
	if(!confirm("本当に登録解除してよろしいですか？\r\n※　ユーザーデータ削除後にログアウトされます")){
		return false;
	}

	removeValidResult();

	$.ajax({
		type : "DELETE",
		cache : false,
		url : '/rest/users',
		data : $('#unregisterForm').serializeArray(),
		dataType : 'json'
	}).done(function(data){
		removeValidResult();
		if(data.result == 90){
			// validationエラー時の処理
			$.each(data.errors, function(key, value){
				reflectValidResult(key, value)
			});
		}else if(data.result == 0){
			alert("登録情報を削除いたしました。");
			$('#logoutForm').submit();
		}else if(data.result == 500){
			alert("データの削除に失敗しました");
		}else{
			alert("想定外のエラーが発生しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});

	return false;
}
