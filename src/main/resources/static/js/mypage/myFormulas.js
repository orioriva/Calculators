'use strict'

// ページのロードが終わったら
window.addEventListener("load", ajaxGetFormulaList() );

var dataTable = null;

//DataTables日本語化
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

/** リストデータを元にtbodyに要素を追加する(formula.jsから呼び出し) */
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
				data: 'title',
				render: function(data,type,row){
					let insert =
						'<div class="d-flex justify-content-between">' +
							data +
							"<button class='btn btn-sm btn-secondary' type='button' value='" + row.id + "' onclick='ajaxUpdateFormulaTitle(\"" + data + "\");'>" +
									"<i class='fas fa-pen'></i>" +
							"</button>"
						'</div>';
					return insert;
				}
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
				render: function(data){
					let insert =
						"<a href='/bbs/newpost' class='btn btn-sm btn-outline-success mr-2' role='button'>" +
							"<i class='fas fa-edit'></i>&ensp;新規投稿" +
						"</a>" +
						"<a href='/calculator?openMine=" + data + "' class='btn btn-sm btn-info mr-2' role='button'>" +
							"<i class='fas fa-download'></i>&ensp;読込" +
						"</a>" +
						"<button class='btn btn-sm btn-danger' type='button' value='" + data + "' onclick='ajaxDeleteFormula();'>" +
							"<i class='fas fa-trash-alt'></i>&ensp;削除" +
						"</button>";
					return insert;
				}
			}
		]
	});
}