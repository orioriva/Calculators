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

/** バリデーション結果の反映 */
function reflectValidResult(key, value){
	// CSS適用
	$('*[name=' + key +']').addClass('is-invalid');
	$('*[name=' + key +']').parent().append('<div class="text-danger">' + value + '</div>');
}

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
		reset: function() {
			this.isChange = false;
			this.password = '';
			this.confirm = '';
		}
	}
}).mount('#input-form')

/** ユーザー情報一覧取得 */
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

/** ユーザー情報１件更新 */
function ajaxUpdateUser(){
	removeValidResult();
	if(!confirm("この内容で更新してよろしいですか？")){
		return;
	}
	setAjax(
		'PUT',
		'/admin/rest/user',
		{
			id: vmForm.id,
			userName: vmForm.userName,
			userId: vmForm.userId,
			isChange: vmForm.isChange,
			password: vmForm.password,
			confirm: vmForm.confirm,
			role: vmForm.role,
			_csrf: $("*[name=_csrf]").val()
		},
		function(data){
			if(data.result == 90){
				// validationエラー時の処理
				$.each(data.errors, function(key, value){
					reflectValidResult(key, value)
				});
			}else if(data.result == 0){
				alert("更新完了しました");
				window.location.reload();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);
}

/** ユーザー情報１件更新 */
function ajaxDeleteUser(){
	if(!confirm("本当に削除してよろしいですか？\r\n※　関連する掲示板投稿は非表示、保存した計算表は削除されます")){
		return;
	}
	setAjax(
		'DELETE',
		'/admin/rest/users',
		{
			id: vmForm.id,
			_csrf: $("*[name=_csrf]").val()
		},
		function(data){
			if(data.result == 0){
				alert("削除完了しました");
				window.location.reload();
			}else{
				errorCodeCheck(data.result);
			}
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
	removeValidResult();
	vmForm.reset();

	let userData = userDataList.find((v) => v.id == userId);
	vmForm.id = userData.id;
	vmForm.userName = userData.userName;
	vmForm.userId = userData.userId;
	vmForm.role = userData.role;

	$('.popup-file').addClass('popup-show').fadeIn();
}