'use strict'

/** 現在の計算表データを新規保存 */
function ajaxAddFormula(title){
	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/rest/formulas',
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
		alert('情報送信に失敗しました');
	});
}

/** 表の計算表一覧部分を取得 */
function ajaxGetFormulaList(){
	// ajax通信
	$.ajax({
		type : "GET",
		cache : false,
		url : '/rest/formulas',
		data : {
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		updateFormulaTable(data);
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});
}

/** 該当計算表を読み込む */
function ajaxLoadFormula(){
	// ajax通信
	$.ajax({
		type : "GET",
		cache : false,
		url : '/rest/formulas/json',
		data : {
			formulaId: parseInt(event.currentTarget.value),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		if(data == null){
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
	});
}

/** 計算表JSONデータ１件更新 */
function ajaxUpdateFormulaJson(){
	if(!confirm("本当に上書きしてよろしいですか？")){
        return;
    }

	// ajax通信
	$.ajax({
		type : "PUT",
		cache : false,
		url : '/rest/formulas/json',
		data : {
			formulaId: parseInt(event.currentTarget.value),
			json: objectsToString(),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		if(data == 999){
			alert("保存に失敗しました");
		}else if(data == 0){
			alert("保存完了しました");
			ajaxGetFormulaList();
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});
}

/** 計算表タイトル名１件更新 */
function ajaxUpdateFormulaTitle(oldTitle){
	if(oldTitle == undefined) oldTitle = "";
	let title = prompt("新しいタイトル名を入力\r\n※　これによる更新日の変更は起こりません", oldTitle);
	if(title == null || title == ""){
		alert("キャンセルしました");
		return;
	}

	// ajax通信
	$.ajax({
		type : "PUT",
		cache : false,
		url : '/rest/formulas/title',
		data : {
			formulaId: parseInt(event.currentTarget.value),
			title: title,
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
	});
}

/** 計算表１件削除 */
function ajaxDeleteFormula(){
	if(!confirm("本当に削除してよろしいですか？")){
        return;
    }

	// ajax通信
	$.ajax({
		type : "DELETE",
		cache : false,
		url : '/rest/formulas',
		data : {
			formulaId: parseInt(event.currentTarget.value),
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
	});
}