'use strict'

// ページのロードが終わったら
window.addEventListener("load", ajaxGetFormulaList() );

/** リストデータを元にtbodyに要素を追加する(formula.jsから呼び出し) */
function updateFormulaTable(formulaData){
	let insertPos = $('#formulaList');
	insertPos.empty();

	$.each(formulaData, function(index, value){
		let row = $('<tr></tr>').appendTo(insertPos);
		let row1= $('<td class="d-flex justify-content-between">' + value.title + '</td>').appendTo(row);
		let renameButton = $("<button class='btn btn-sm btn-secondary' type='button' value='" + value.id + "' onclick='ajaxUpdateFormulaTitle(" + '"' + value.title + '"' + ");'><i class='fas fa-pen'></i>&ensp;変更</button>").appendTo(row1);
		
		//renameButton.on('click', function(e){
			//ajaxUpdateFormulaTitle(e,value.title);
		//});
		
		$(
			'<td>' + formatDate(new Date(value.updateDate), "YYYY / MM / DD") + '</td>'
			+ '<td>'
			+ "<button class='btn btn-sm btn-info mr-2' type='button' value='" + value.id + "' onclick=''><i class='fas fa-download'></i>&ensp;読込</button>"
			+ "<button class='btn btn-sm btn-danger' type='button' value='" + value.id + "' onclick='ajaxDeleteFormula();'><i class='fas fa-trash-alt'></i>&ensp;削除</button>"
			+ '</td>'
		).appendTo(row);
	});
}