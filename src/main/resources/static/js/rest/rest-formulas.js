'use strict'

/** 現在の計算表データを新規保存 */
function ajaxAddFormula(title){
	setAjax(
		'POST',
		'/rest/formulas',
		{
			title: title,
			json: objectsToString(),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data == 0){
				alert("保存完了しました");
				ajaxGetFormulaList();
			}else{
				errorCodeCheck(data);
			}
		}
	);
}

/** 表の計算表一覧部分を取得 */
function ajaxGetFormulaList(){
	setAjax(
		'GET',
		'/rest/formulas',
		{
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			updateFormulaTable(data);
		}
	);
}

/** 該当計算表を読み込む */
function ajaxLoadFormula(){
	setAjax(
		'GET',
		'/rest/formulas/json',
		{
			formulaId: parseInt(event.currentTarget.value),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			allDelete();
			$('#jsonData').val(JSON.stringify(data));
			loadObjects();
			$('.popup-file').fadeOut();
			alert('データを読み込みました');
		}
	);
}

/** 計算表JSONデータ１件更新 */
function ajaxUpdateFormulaJson(){
	if(!confirm("本当に上書きしてよろしいですか？")){
        return;
    }

	setAjax(
		'PUT',
		'/rest/formulas/json',
		{
			formulaId: parseInt(event.currentTarget.value),
			json: objectsToString(),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data == 0){
				alert("保存完了しました");
				ajaxGetFormulaList();
			}else{
				errorCodeCheck(data);
			}
		}
	);
}

/** 計算表タイトル名１件更新 */
function ajaxUpdateFormulaTitle(oldTitle){
	if(oldTitle == undefined) oldTitle = "";
	let title = prompt("新しいタイトル名を入力(50文字以内)\r\n※　これによる更新日の変更は起こりません", oldTitle);
	if(title == null || title == ""){
		alert("キャンセルしました");
		return;
	}else if(title.length > 50){
		alert("タイトルは50文字以内で入力して下さい");
		ajaxUpdateFormulaTitle(title);
		return;
	}

	setAjax(
		'PUT',
		'/rest/formulas/title',
		{
			formulaId: parseInt(event.currentTarget.value),
			title: title,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data == 0){
				alert("更新完了しました");
				ajaxGetFormulaList();
			}else{
				errorCodeCheck(data);
			}
		}
	);
}

/** 計算表１件削除 */
function ajaxDeleteFormula(){
	if(!confirm("本当に削除してよろしいですか？")){
        return;
    }

	setAjax(
		'DELETE',
		'/rest/formulas',
		 {
			formulaId: parseInt(event.currentTarget.value),
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data == 0){
				alert("削除完了しました");
				ajaxGetFormulaList();
			}else{
				errorCodeCheck(data);
			}
		}
	);
}