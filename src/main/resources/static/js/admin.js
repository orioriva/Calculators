'use strict'

setDataTablesStatus(3);

ajaxGetUserList();

function ajaxGetUserList(){
	setAjax(
		'GET',
		'/admin/rest/users',
		{},
		function(data){
			updateUsersTable(data);
		}
	);
}

/** リストデータを元にtbodyに要素を追加する */
function updateUsersTable(userData){
	// 既にdataTableが定義されていれば削除
	if(dataTable !== null){
		dataTable.destroy();
	}

	dataTable = $('#dataTable').DataTable({
		data: userData,
		columns: [
			// ID
			{
				data: 'id'
			},
			// ユーザー名
			{
				data: 'userName',
			},
			// ログインID
			{
				data: 'userId'
			},
			// 権限
			{
				data: 'role'
			},
			// 操作
			{
				data: 'id',
				render: function(data,type,row){
					let insert =
						"<button class='btn btn-sm btn-success' type='button' onclick=''>" +
							"<i class='fas fa-check'></i>&ensp;選択" +
						"</button>";
					return insert;
				}
			}
		]
	});
}