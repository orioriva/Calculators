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
		updateFormulaTable(data);
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	}).always(function(){
		// 常に実行する処理
	});
}

/** 該当計算表を読み込む */
function ajaxLoadFormula(){
	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/formulas/load/rest',
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
	}).always(function(){
	});
}

/** 計算表JSONデータ１件更新 */
function ajaxUpdateFormulaJson(){
	if(!confirm("本当に上書きしてよろしいですか？")){
        return;
    }

	// ajax通信
	$.ajax({
		type : "POST",
		cache : false,
		url : '/mypage/formulas/updateJson/rest',
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
	}).always(function(){
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
		type : "POST",
		cache : false,
		url : '/mypage/formulas/updateTitle/rest',
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
	}).always(function(){
	});
}