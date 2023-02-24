'use strict'

/** ajax通信 */
function setAjax(type, url, sendData, func){
	$.ajax({
		type : type,
		cache : false,
		url : url,
		data : sendData,
		dataType : 'json'
	}).done(function(data){
		if(data == null){
			alert('データを取得できませんでした');
			return;
		}
		func(data);
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});
}

/** 共通エラー処理 */
function errorCodeCheck(errorCode){
	switch(errorCode){
		case 999:
			alert("データベース操作に失敗しました");
			break;
		default:
			alert("想定外のエラーが発生しました");
			break;
	}
}

/** バリデーション結果をクリア */
function removeValidResult(){
	$('.is-invalid').removeClass('is-invalid');
	$('.invalid-feedback').remove();
	$('.text-danger').remove();
}