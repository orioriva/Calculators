'use strict'

/** ID変更のスイッチが押された時 */
$('#changeId').change(function() {
	if($(this).prop('checked')){
		$('#newIdArea').animate({height:'show', opacity:'show'},'normal');
		$('#confirmArea').animate({height:'show', opacity:'show'},'normal');
	}else{
		$('#newIdArea').animate({height:'hide', opacity:'hide'},'normal');
		if(!$('#changePassword').prop('checked')){
			$('#confirmArea').animate({height:'hide', opacity:'hide'},'normal');
		}
	}
});

/** パスワード変更のスイッチが押された時 */
$('#changePassword').change(function() {
	if($(this).prop('checked')){
		$('#newPasswordArea').animate({height:'show', opacity:'show'},'normal');
		$('#confirmArea').animate({height:'show', opacity:'show'},'normal');
	}else{
		$('#newPasswordArea').animate({height:'hide', opacity:'hide'},'normal');
		if(!$('#changeId').prop('checked')){
			$('#confirmArea').animate({height:'hide', opacity:'hide'},'normal');
		}
	}
});

/** ユーザー名変更 */
function ajaxRename(){
	removeValidResult();

	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/userSettings/rename/rest',
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
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	});

	return false;
}

/** ＩＤ・パスワード変更 */
function ajaxChangeIdPassword(){
	if(!confirm("本当に変更してよろしいですか？\r\n※　変更後にログアウトされます")){
		return;
	}

	removeValidResult();

	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/userSettings/resetIdPassword/rest',
		data : $('#changeIdPasswordForm').serializeArray(),
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
			alert("ＩＤ・パスワードを更新しました");
			$('#logoutForm').submit();
		}else if(data.result == 500){
			alert("データの更新に失敗しました");
		}else{
			alert("想定外のエラーが発生しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	});

	return false;
}

/** ユーザー削除 */
function ajaxChangeIdPassword(){
	if(!confirm("本当に登録解除してよろしいですか？\r\n※　ユーザーデータ削除後にログアウトされます")){
		return;
	}

	removeValidResult();

	$.ajax({
		type : "DELETE",
		cache : false,
		url : '/mypage/userSettings/unregister/rest',
		data : $('#unregisterForm').serializeArray(),
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
			alert("登録情報を削除いたしました。");
			$('#logoutForm').submit();
		}else if(data.result == 500){
			alert("データの削除に失敗しました");
		}else{
			alert("想定外のエラーが発生しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	});

	return false;
}

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
