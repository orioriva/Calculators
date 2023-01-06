'use strict'

/** ページ遷移前の確認 */
window.onbeforeunload = function(event){
    event.returnValue = 'ページを離れますか？\r\n保存していない内容は破棄されます！';
};

/** 操作ガイドボタンが押された時 */
$("#guide-btn").click(function() {
    $('.popup-guide').addClass('show').fadeIn();
});

/** 操作ガイドを閉じる時 */
$('.popup-guide').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup-guide').fadeOut();
	}
});
$('#close-guide').click(function() {
    $('.popup-guide').fadeOut();
});

/** 全消去ボタンが押された時 */
$('#delete-btn').click(function() {
    if(confirm("本当に全て削除しますか？")){
        allDelete();
    }
});

/** 開くボタンが押された時 */
$('#open-btn').click(function() {
    $('.popup-file').addClass('show').fadeIn();
});

/** ファイルを閉じる時 */
$('.popup-file').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup-file').fadeOut();
	}
});
$('#close-file').click(function() {
    $('.popup-file').fadeOut();
});

/** 新規保存ボタンが押された時 */
$('#addData').click(function() {
	let title = prompt("保存する計算式のタイトルを入力", this.text);
	if(title == null || title == ""){
		alert("キャンセルしました");
		return;
	}

	ajaxAddData();
});

// クリップボードへコピー（コピーの処理）
function copyToClipboard (text) {
    if (navigator.clipboard) { // navigator.clipboardが使えるか判定する
        return navigator.clipboard.writeText(text).then(function () { // クリップボードへ書きむ
            alert("クリップボードに書き込みました");
        });
    } else {
        alert("お使いの環境ではこの機能を使用できません");
    }
}

/** 現在の計算表データを新規保存 */
function ajaxAddData(){
	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/formulas/add/rest',
		data : {
			title: title,
			json: objectsToString(),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		// ajax成功時の処理
		console.log(data);

		if(data == 999){
			alert("データベースへの追加に失敗しました");
		}else if(data == 0){
			alert("登録完了しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	}).always(function(){
		// 常に実行する処理
	});
}

function ajaxGetFormulaList(){
	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/formulas/rest',
		data : {
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		// ajax成功時の処理
		console.log(data);

		let insertPos = $('#formulaList');

		$.each(data, function(index, value){
			let row = $('<tr></tr>').appendTo(insertPos);

		});
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	}).always(function(){
		// 常に実行する処理
	});
}