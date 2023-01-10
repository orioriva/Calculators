'use strict'

// ページのロードが終わったら
window.addEventListener("load", ajaxGetFormulaList() );

var dataTable = null;

//DataTables日本語化
$.extend( $.fn.dataTable.defaults, {
    language: {
        url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
    }
});

/** リストデータを元にtbodyに要素を追加する(formula.jsから呼び出し) */
function updateFormulaTable(formulaData){
	let insertPos = $('#formulaList');
	insertPos.empty();

	$.each(formulaData, function(index, value){
		let row = $('<tr></tr>').appendTo(insertPos);
		let title = $('<td class="d-flex justify-content-between">' + value.title + '</td>').appendTo(row);
		let renameButton = $("<button class='btn btn-sm btn-secondary' type='button' value='" + value.id + "' onclick='ajaxUpdateFormulaTitle(\"" + value.title + "\");'><i class='fas fa-pen'></i>&ensp;変更</button>").appendTo(title);

		//renameButton.on('click', function(e){
			//ajaxUpdateFormulaTitle(e,value.title);
		//});

		$('<td>' + formatDate(new Date(value.updateDate), "YYYY / MM / DD") + '</td>').appendTo(row);
		let controlls = $('<td></td>').appendTo(row);
		$("<a href='/calculator?openMine=" + value.id + "' class='btn btn-sm btn-info mr-2' role='button'><i class='fas fa-download'></i>&ensp;読込</a>").appendTo(controlls);
		$("<button class='btn btn-sm btn-danger' type='button' value='" + value.id + "' onclick='ajaxDeleteFormula();'><i class='fas fa-trash-alt'></i>&ensp;削除</button>").appendTo(controlls);
	});

	// 既にdataTableが定義されていれば削除
	if(dataTable !== null){
		dataTable.destroy();
	}

	dataTable = $('#dataTable').DataTable();
}