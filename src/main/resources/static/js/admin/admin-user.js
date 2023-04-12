'use strict'

var userDataList;

setDataTablesStatus(4);

ajaxGetUserList();

/** ファイルを閉じる時 */
$('.popup-file').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup-file').fadeOut();
	}
});
$('#close-file').click(function() {
    $('.popup-file').fadeOut();
});

/** ユーザー情報編集用vueインスタンス */
const vmForm = Vue.createApp({
	data(){
		return{
			id: 0,
			userId: '',
			userName: '',
			isChange: false,
			password: '',
			confirm: '',
			role: ''
		}
	},
	methods: {
		/*
		addOption(options) {
			options.forEach(element => this.options.push(element))
		},
		init(data){
			this.title = data.title;
			this.category = data.categoryId;
			this.comment = data.comment;
		}
		*/
	}
}).mount('#input-form')

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
			{ data: 'id' },
			// ユーザー名
			{ data: 'userName' },
			// ログインID
			{ data: 'userId' },
			// 権限
			{
				data: 'role',
				render: function(data){
					if(data === 'ROLE_ADMIN')
						return '管理者';
					else
						return '一般ユーザー';
				}
			},
			// 操作
			{
				data: 'id',
				render: function(data){
					if(currentUserId === data)
						return "自身は変更不可";
					let insert =
						"<button class='btn btn-sm btn-primary' type='button' onclick='setUserDataFromId(" + data + ")'>" +
							"<i class='fas fa-cog'></i>&ensp;情報変更" +
						"</button>";
					return insert;
				}
			}
		]
	});

	userDataList = userData;
}

/** フォームの初期値をセット */
function setUserDataFromId(userId){
	let userData = userDataList.find((v) => v.id == userId);
	vmForm.id = userData.id;
	vmForm.userName = userData.userName;
	vmForm.userId = userData.userId;
	vmForm.role = userData.role;

	$('.popup-file').addClass('popup-show').fadeIn();
}