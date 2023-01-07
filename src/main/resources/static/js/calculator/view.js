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
    ajaxGetFormulaList();
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

	ajaxAddData(title);
});

/** 日付をYYYY/MM/DD形式にフォーマットする */
function formatDate(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1);
    format = format.replace(/DD/, date.getDate());
    return format;
}

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
function ajaxAddData(title){
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
		if(data == 999){
			alert("データベースへの追加に失敗しました");
		}else if(data == 0){
			alert("保存完了しました");
			ajaxGetFormulaList();
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	}).always(function(){
		// 常に実行する処理
	});
}

/** 表の計算表一覧部分を取得 */
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
		let insertPos = $('#formulaList');
		insertPos.empty();

		$.each(data, function(index, value){
			let row = $('<tr></tr>').appendTo(insertPos);
			$(
				  '<td>' + value.title + '</td>'
				+ '<td>' + formatDate(new Date(value.updateDate), "YYYY / MM / DD") + '</td>'
				+ '<td>'
				+ "<button class='btn btn-sm btn-success mr-2' type='button' value='" + value.id + "' onclick='ajaxOverwriteFormula();'><i class='fas fa-save'></i>&ensp;上書き保存</button>"
				+ "<button class='btn btn-sm btn-info mr-2' type='button' value='" + value.id + "' onclick='ajaxLoadFormula();'><i class='fas fa-download'></i>&ensp;読込</button>"
				+ "<button class='btn btn-sm btn-danger' type='button' value='" + value.id + "' onclick='ajaxDeleteFormula();'><i class='fas fa-trash-alt'></i>&ensp;削除</button>"
				+ '</td>'
			).appendTo(row);
		});
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	}).always(function(){
		// 常に実行する処理
	});
}

/** 該当計算表を読み込む */
function ajaxLoadFormula(){
	if(!confirm("データを読み込むと現在編集中の計算表は上書きされますがよろしいですか？")){
        return;
    }

	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/formulas/load/rest',
		data : {
			formulaId: parseInt(event.target.value),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		if(data == null || data == ''){
			alert('データを取得できませんでした');
			return;
		}
		allDelete();
		$('#jsonData').val(JSON.stringify(data));
		loadObjects();
		$('.popup-file').fadeOut();
		alert('データを読み込みました');
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	}).always(function(){
	});
}

/** 計算表１件更新 */
function ajaxOverwriteFormula(){
	if(!confirm("本当に上書きしてよろしいですか？")){
        return;
    }

	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/formulas/update/rest',
		data : {
			formulaId: parseInt(event.target.value),
			json: objectsToString(),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		if(data == 999){
			alert("更新に失敗しました");
		}else if(data == 0){
			alert("更新完了しました");
			ajaxGetFormulaList();
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	}).always(function(){
	});
}

/** 計算表１件削除 */
function ajaxDeleteFormula(){
	if(!confirm("本当に削除してよろしいですか？")){
        return;
    }

	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/formulas/delete/rest',
		data : {
			formulaId: parseInt(event.target.value),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		if(data == 999){
			alert("削除に失敗しました");
		}else if(data == 0){
			alert("削除完了しました");
			ajaxGetFormulaList();
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	}).always(function(){
	});
}