'use strict'

/** DataTables初期設定 */
setDataTablesStatus(4,3);

/** ページの読み込みが終わったら */
$(document).ready(function () {
	ajaxGetPostList();
});

function ajaxGetPostList(){
	$.ajax({
		type : "POST",
		cache : false,
		url : '/bbs/rest',
		data : {
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		console.log(data);
		createDataTable(data);
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	}).always(function(){
		// 常に実行する処理
	});
}

function filterColumn(col) {
	let searchText = event.currentTarget.value;
	$('#dataTable')
		.DataTable()
		.column(col)
		.search(
			searchText
		)
		.draw();
}

function createDataTable(list){
	//既にdataTableが定義されていれば削除
	if(dataTable !== null){
		dataTable.destroy();
	}

	dataTable = $('#dataTable').DataTable({
		sDom: 'lrtip',	// 検索非表示
		data: list,
		columns: [
			// カテゴリ
			{
				data: 'category'
			},
			// 作成者
			{
				data: 'creatorName'
			},
			//　タイトル
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
			//　操作
			{
				data: 'id',
				render: function(data,type,row){
					let insert =
						'<a href="/bbs/post?postId=' + data + '" class="btn btn-sm btn-info" role="button">開く</a>';
					return insert;
				}
			}
		]
	});
}