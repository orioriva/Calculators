'use strict'

var postDataList;

setDataTablesStatus(7);

var addCategoryListFunc = null;

/** ファイルを閉じる時 */
$('.popup-file').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup-file').fadeOut();
	}
});
$('#close-file').click(function() {
    $('.popup-file').fadeOut();
});

/** 検索用vueインスタンス */
const vmSearchForm = Vue.createApp({
	data(){
		return{
			options: []
		}
	},
	methods: {
		addOption(options) {
			options.forEach(element => this.options.push(element))
		}
	},
	mounted(){
		addCategoryListFunc = this.addOption;
	}
}).mount('#search-form')

/** 情報更新用vueインスタンス */
const vmInputForm = Vue.createApp({
	data(){
		return{
			id: 0,
			category: 1,
			poster: '',
			title: '',
			comment: '',
			updateDate: '',
			view: true,
			options: vmSearchForm.options
		}
	},
	methods: {
		init(postId) {
			let postData = postDataList.find((v) => v.id == postId);
			this.id = postData.id;
			this.category = postData.categoryId;
			this.poster = postData.creatorName;
			this.title = postData.title;
			this.comment = postData.comment;
			this.updateDate = dateToTextDef(new Date(postData.updateDate));
			this.view = postData.view;
		},
		deletePost: function() {
			ajaxDeletePost(this.id);
		}
	}
}).mount('#input-form')


/** ページの読み込みが終わったら */
$(document).ready(function () {
	ajaxGetPostList();
	ajaxGetCategoryList();
});

/** カテゴリーリスト取得 */
function ajaxGetCategoryList(){
	setAjax(
		'GET',
		'/rest/category',
		{},
		function(data){
			if(!addCategoryListFunc){
				alert("カテゴリーリストを取得する関数が用意されていません！");
				return;
			}
			addCategoryListFunc(data);
		}
	);
}

/** 投稿一覧取得 */
function ajaxGetPostList(){
	setAjax(
		'GET',
		'/admin/rest/posts',
		{
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			createDataTable(data);
		}
	);
}

/** 投稿１件更新 */
function ajaxUpdatePost(){
	if(!confirm("この内容で更新してよろしいですか？")){
		return;
	}

	setAjax(
		'PUT',
		'/admin/rest/posts',
		{
			id: vmInputForm.id,
			categoryId: vmInputForm.category,
			title: vmInputForm.title,
			comment: vmInputForm.comment,
			view: vmInputForm.view,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data.result == 0){
				alert("更新完了しました");
				$('.popup-file').fadeOut();
				ajaxGetPostList();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);
}

/** 投稿１件削除 */
function ajaxDeletePost(){
	if(!confirm("本当に削除してよろしいですか？")){
		return false;
	}

	setAjax(
		'DELETE',
		'/admin/rest/posts',
		{
			postId: vmInputForm.id,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data.result == 0){
				alert("削除完了しました");
				$('.popup-file').fadeOut();
				ajaxGetPostList();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);
}

/** フォームの初期値をセット */
function setUserDataFromId(postId){
	vmInputForm.init(postId);
	$('.popup-file').addClass('popup-show').fadeIn();
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
			{ data: 'id' },
			{ data: 'category' },
			{
				data: 'creatorName',
				render: function(data){
					return data != null ? data : '<div class="text-black-50">※ 退会済 ※</div>';
				}
			},
			{ data: 'title' },
			{ data: 'comment' },
			{
				data: 'updateDate',
				render: function(data){
					return dateToTextDef(new Date(data));
				}
			},
			{
				data: 'view',
				render: function(data){
					const icon = (!data ? '-slash' : '');
					const str = (data ? '公開' : '隠す');
					return '<i class="fas fa-eye' + icon + '"></i>&ensp;' + str;
				}
			},
			// 操作
			{
				data: 'id',
				render: function(data,type,row){
					let insert =
						"<button class='btn btn-sm btn-primary' type='button' onclick='setUserDataFromId(" + data + ")'>" +
							"<i class='fas fa-cog'></i>&ensp;情報変更" +
						"</button>";
					return insert;
				}
			}
		]
	});

	postDataList = list;
}