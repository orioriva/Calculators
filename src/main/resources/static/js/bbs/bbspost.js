'use strict'

/** DataTables初期設定 */
setDataTablesStatus(2,1);

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
	$('#postFormula').val(formulaId);
	$('.popup-file').fadeOut();
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
					return dateToTextDef(new Date(data));
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
