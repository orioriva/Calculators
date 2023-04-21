'use strict'

setDataTablesStatus();

/** ページの読み込みが終わったら */
$(document).ready(function () {
	ajaxGetCommentList();
});

/** 投稿一覧取得 */
function ajaxGetCommentList(){
	setAjax(
		'GET',
		'/admin/rest/comments',
		{
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			createDataTable(data);
		}
	);
}

function ajaxChangeView(postId,no){
	setAjax(
		'PUT',
		'/admin/rest/comments/view',
		{
			postId: postId,
			no: no,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			ajaxGetCommentList();
		}
	);
}

function createDataTable(list){
	//既にdataTableが定義されていれば削除
	if(dataTable !== null){
		dataTable.destroy();
	}

	dataTable = $('#dataTable').DataTable({
		data: list,
		columns: [
			{ data: 'postId' },
			{ data: 'no' },
			{ data: 'posterId' },
			{ data: 'posterName' },
			{
				data: 'postDate',
				render: function(data){
					return dateToTextDef(new Date(data));
				}
			},
			{ data: 'comment' },
			{
				data: 'view',
				render: function(data,type,row){
					const icon = (!data ? '-slash' : '');
					const str = (data ? '公開' : '隠す');
					let insert =
						'<i class="fas fa-eye' + icon + '"></i>&ensp;' + str +
						"<button class='ml-2 btn btn-sm btn-secondary' type='button' onclick='ajaxChangeView(" + row.postId + "," + row.no + ")'>" +
							"<i class='fas fa-sync-alt'></i>" +
						"</button>";
					return insert;
				}
			}
		]
	});
}