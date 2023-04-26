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
	}).fail(function(jqXHR, textStatus, errorThrown){
		// 通信失敗時の処理
		alert('情報送信に失敗しました');
        console.log("ajax通信に失敗しました");
        console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
        console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
        console.log("errorThrown    : " + errorThrown.message); // 例外情報
        console.log("URL            : " + url);
	});
}

/** 共通エラー処理 */
function errorCodeCheck(errorCode){
	switch(errorCode){
		case 500:
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