'use strict'

var dataTable = null;

//DataTables日本語化
$.extend( $.fn.dataTable.defaults, {
    language: {
        url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
    }
});

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

/** 読み込み前の確認 */
function loadConfirm(){
	if(!confirm("データを読み込むと現在編集中の計算表は上書きされますがよろしいですか？")){
        return;
    }
    ajaxLoadFormula();
}

/** リストデータを元にtbodyに要素を追加する(formula.jsから呼び出し) */
function updateFormulaTable(formulaData){
	let insertPos = $('#formulaList');
	insertPos.empty();

	$.each(formulaData, function(index, value){
		let row = $('<tr></tr>').appendTo(insertPos);
		$(
			  '<td class="d-flex justify-content-between">' + value.title + "<button class=' btn btn-sm btn-secondary' type='button' value='" + value.id + "' onclick='ajaxUpdateFormulaTitle(" + '"' + value.title + '"' + ");'><i class='fas fa-pen'></i>&ensp;変更</button></td>"
			+ '<td>' + formatDate(new Date(value.updateDate), "YYYY / MM / DD") + '</td>'
			+ '<td>'
			+ "<button class='btn btn-sm btn-success mr-2' type='button' value='" + value.id + "' onclick='ajaxUpdateFormulaJson();'><i class='fas fa-save'></i>&ensp;上書き保存</button>"
			+ "<button class='btn btn-sm btn-info mr-2' type='button' value='" + value.id + "' onclick='loadConfirm();'><i class='fas fa-download'></i>&ensp;読込</button>"
			+ "<button class='btn btn-sm btn-danger' type='button' value='" + value.id + "' onclick='ajaxDeleteFormula();'><i class='fas fa-trash-alt'></i>&ensp;削除</button>"
			+ '</td>'
		).appendTo(row);
	});

	// 既にdataTableが定義されていれば削除
	if(dataTable !== null){
		dataTable.destroy();
	}

	dataTable = $('#dataTable').DataTable();
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