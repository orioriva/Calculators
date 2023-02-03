'use strict'

/** 画面ロード時の処理 */
window.addEventListener('DOMContentLoaded', function(){
	jQuery(function($){
		/** 送信ボタンを押した時の処理 */
		$('#btn-send').click(function(event) {
			// データ送信
			sendData();
		});
	});
});


/** データ送信処理 */
function sendData(){
	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	var formData = $('#input-form').serializeArray();

	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/register/rest',
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
			$('#input-form').submit();
			alert("登録完了しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	}).always(function(){
		// 常に実行する処理
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
