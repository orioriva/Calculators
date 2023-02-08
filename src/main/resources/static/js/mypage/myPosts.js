'use strict'

/** DataTables初期設定 */
setDataTablesStatus(4,3);

/** ページの読み込みが終わったら */
$(document).ready(function () {
	ajaxGetMyPostList();
});

/** 投稿削除ボタンが押されたら */
function deletePostAfter(){
	ajaxGetMyPostList();
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
						'<a href="/bbs/post?postId=' + data + '" class="btn btn-sm btn-info" role="button">' +
							'<i class="fas fa-book-open"></i>&ensp;閲覧' +
						'<a href="/bbs/post/update?postId=' + data + '" class="ml-2 btn btn-sm btn-success" role="button">' +
							'<i class="fas fa-edit"></i>&ensp;投稿内容編集' +
						'</a>' +
						'<button type="button" class="ml-2 btn btn-sm btn-danger" id="delete-btn" onclick="ajaxDeletePost(' + data + ');">' +
							'<i class="fas fa-trash-alt"></i>&ensp;投稿を削除' +
						'</button>'
						;
					return insert;
				}
			}
		]
	});
}