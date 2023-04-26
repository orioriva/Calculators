'use strict'

setDataTablesStatus(2);

/** フォームの初期値をセット */
function setCategoryDataFromId(id){
	vmForm.init(id);
	$('.popup-file').addClass('popup-show').fadeIn();
}

/** カテゴリ情報vueインスタンス */
const vmForm = Vue.createApp({
	data(){
		return{
			id: 0,
			name: '',
			selected: 1,
			options: []
		}
	},
	methods: {
		addOption(options) {
			this.options = [];
			options.forEach(element => this.options.push(element));
		},
		init(id){
			let data = this.options.find((v) => v.id == id);
			this.id = data.id;
			this.name = data.name;
			this.selected = 1;
		},
		filterOptions(){
			return this.options.filter(v => v.id !== this.id);
		}
	}
}).mount('#input-body')

/** ファイルを閉じる時 */
$('.popup-file').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup-file').fadeOut();
	}
});
$('#close-file').click(function() {
    $('.popup-file').fadeOut();
});

/** ページの読み込みが終わったら */
$(document).ready(function () {
	ajaxGetCategoryList();
});

/** カテゴリーリスト取得 */
function ajaxGetCategoryList(){
	setAjax(
		'GET',
		'/admin/rest/category',
		{},
		function(data){
			vmForm.addOption(data);
			createDataTable(data);
		}
	);
}

/** カテゴリ１件追加 */
function ajaxAddCategory(){
	let name = prompt("追加するカテゴリ名を入力");
	if(name == null || name == ""){
		alert("キャンセルしました");
		return;
	}

	setAjax(
		'POST',
		'/admin/rest/category',
		{
			name: name,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data.result == 0){
				alert("追加しました");
				ajaxGetCategoryList();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);
}

/** カテゴリ名変更 */
function ajaxUpdateCategory(){
	let name = prompt("新しいカテゴリ名を入力");
	if(name == null || name == ""){
		alert("キャンセルしました");
		return;
	}

	setAjax(
		'PUT',
		'/admin/rest/category',
		{
			id: vmForm.id,
			name: name,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data.result == 0){
				alert("変更しました");
				$('.popup-file').fadeOut();
				ajaxGetCategoryList();
			}else if(data.result == 90){
				alert("このカテゴリは変更出来ません");
			}else{
				errorCodeCheck(data.result);
			}
		}
	);
}

/** カテゴリを統合する */
function ajaxIntegrationCategory(){
	if(!confirm("本当に統合してよろしいですか？\r\n※　このカテゴリは削除されます")){
        return;
    }

	setAjax(
		'DELETE',
		'/admin/rest/category',
		{
			beforeId: vmForm.id,
			afterId: vmForm.selected,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data.result == 0){
				alert("統合しました");
				$('.popup-file').fadeOut();
				ajaxGetCategoryList();
			}else if(data.result == 90){
				alert("このカテゴリは変更出来ません");
			}else{
				errorCodeCheck(data.result);
			}
		}
	);
}

/** テーブル生成 */
function createDataTable(list){
	//既にdataTableが定義されていれば削除
	if(dataTable !== null){
		dataTable.destroy();
	}

	dataTable = $('#dataTable').DataTable({
		data: list,
		columns: [
			{ data: 'id' },
			{ data: 'name' },
			{
				data: 'id',
				render: function(data,type,row){
					let insert = (data == 1) ?
						"※　固定の為変更不可　※" :
						"<button class='btn btn-sm btn-primary' type='button' onclick='setCategoryDataFromId(" + data + ")'>"+
							"<i class='fas fa-cog'></i>&ensp;情報変更"+
						"</button>";
					return insert;
				}
			}
		]
	});
}