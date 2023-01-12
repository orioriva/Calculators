'use strict'

var dataTable = null;

//DataTables設定
$.extend( $.fn.dataTable.defaults, {
    language: {
        url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
    },
    lengthMenu: [ 10, 20, 30, 40, 50 ],
    displayLength: 10,
    columnDefs: [{
		  "targets": 2,
		  "orderable": false,
		  "searchable": false
	}]
});

/** 送信ボタンが押された時 */
$('#send-btn').click(function() {
	ajaxAddBBSPost();
});

/** ファイルを開くボタンが押された時 */
$('#open-btn').click(function() {
    $('.popup-file').addClass('show').fadeIn();
    ajaxGetFormulaList();
});

/** ファイルを閉じる時 */
$('.popup-file').click(function(e){
    if(!$(e.target).closest('.content').length){
    	if($(e.target).prop("tagName") != "A"){
    		$('.popup-file').fadeOut();
    	}
	}
});
$('#close-file').click(function() {
    $('.popup-file').fadeOut();
});

/** 計算表をセットする */
function setFormula(formulaId, title){
	$('#titleText').text(title);
	$('#formulaId').val(formulaId);
	$('.popup-file').fadeOut();
}

/** 日付をYYYY/MM/DD形式にフォーマットする */
function formatDate(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1);
    format = format.replace(/DD/, date.getDate());
    return format;
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

function ajaxAddBBSPost(){
	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	var formData = $('#input-form').serializeArray();

	$.ajax({
		type : "POST",
		cache : false,
		url : '/bbs/newpost/rest',
		data : formData,
		dataType : 'json'
	}).done(function(data){
		console.log(data);
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
			alert("投稿完了しました");
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	}).always(function(){
	});
}

/** リストデータを元にtbodyに要素を追加する */
function updateFormulaTable(formulaData){
	// 既にdataTableが定義されていれば削除
	if(dataTable !== null){
		dataTable.destroy();
	}

	dataTable = $('#dataTable').DataTable({
		data: formulaData,
		columns: [
			// タイトル
			{
				data: 'title'
			},
			// 更新日
			{
				data: 'updateDate',
				render: function(data){
					return formatDate(new Date(data), "YYYY / MM / DD");
				}
			},
			// 操作
			{
				data: 'id',
				render: function(data,type,row){
					let insert =
						"<button class='btn btn-sm btn-success' type='button' onclick='setFormula(" + data + ',"' + row.title + "\");'>" +
							"<i class='fas fa-check'></i>&ensp;選択" +
						"</button>";
					return insert;
				}
			}
		]
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