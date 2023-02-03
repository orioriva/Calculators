'use strict'

/** ID変更のスイッチが押された時 */
$('#newIdSwitch').change(function() {
	if($(this).prop('checked')){
		$('#newIdArea').animate({height:'show', opacity:'show'},'normal');
	}else{
		$('#newIdArea').animate({height:'hide', opacity:'hide'},'normal');
	}
});

/** パスワード変更のスイッチが押された時 */
$('#newPasswordSwitch').change(function() {
	if($(this).prop('checked')){
		$('#newPasswordArea').animate({height:'show', opacity:'show'},'normal');
	}else{
		$('#newPasswordArea').animate({height:'hide', opacity:'hide'},'normal');
	}
});

function ajaxRename(){
	// バリデーション結果をクリア
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
