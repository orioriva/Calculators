'use strict'

/** ファイルを閉じる時 */
$('.popup-file').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup-file').fadeOut();
	}
});
$('#close-file').click(function() {
    $('.popup-file').fadeOut();
});

/** フォームの初期値をセット */
function setCategoryDataFromId(id){
	vmInputForm.init(id);
	$('.popup-file').addClass('popup-show').fadeIn();
}

/** カテゴリ情報編集用vueインスタンス */
const vmTable = Vue.createApp({
	data(){
		return{
			options: []
		}
	},
	methods: {
		init(id){
			vmInputForm.init(id);
		},
		addOption(options) {
			this.options = [];
			options.forEach(element => this.options.push(element));
			vmInputForm.options = this.options;
		}
	}
}).mount('#dataTable')

const vmInputForm = Vue.createApp({
	data(){
		return{
			id: 0,
			name: '',
			selected: 1,
			options: vmTable.options
		}
	},
	methods: {
		init(id){
			let data = vmTable.options.find((v) => v.id == id);
			this.id = data.id;
			this.name = data.name;
			this.selected = 1;
			$('.popup-file').addClass('popup-show').fadeIn();
		},
		filterOptions(){
			return this.options.filter(v => v.id !== this.id);
		}
	}
}).mount('#input-form')

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
			vmTable.addOption(data);
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
			id: vmInputForm.id,
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
			beforeId: vmInputForm.id,
			afterId: vmInputForm.selected,
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