'use strict'

setDataTablesStatus(6);

var addCategoryListFunc = null;

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

/** ページの読み込みが終わったら */
$(document).ready(function () {
	ajaxGetPostList();
	ajaxGetCategoryList();
});

/** 指定列を検索 */
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

/** 投稿１件削除 */
function ajaxDeletePost(postId){
	if(!confirm("本当に削除してよろしいですか？\r\n削除ID：" + postId)){
		return false;
	}

	setAjax(
		'DELETE',
		'/admin/rest/posts',
		{
			postId: postId,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data.result == 0){
				alert("削除完了しました");
				ajaxGetPostList();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);
}

/** 投稿１件表示非表示切り替え */
function ajaxChangePostView(postId,view){
	setAjax(
		'PUT',
		'/admin/rest/posts/view',
		{
			postId: postId,
			view: view,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data.result == 0){
				ajaxGetPostList();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);
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
			{ data: 'creatorName' },
			{ data: 'title' },
			{
				data: 'updateDate',
				render: function(data){
					return dateToTextDef(new Date(data));
				}
			},
			{
				data: 'view',
				render: function(data,type,row){
					let insert =
						data +'<button class="ml-2 btn btn-sm btn-secondary" onclick="ajaxChangePostView(' + row.id + ',' + !data +')">'+
							'<i class="fas fa-sync-alt"></i>&ensp;切り替え'+
						'</button>';
					return insert;
				}
			},
			// 操作
			{
				data: 'id',
				render: function(data,type,row){
					let insert =
						'<a href="/bbs/post?postId=' + data + '" class="btn btn-sm btn-info" role="button">' +
							'<i class="fas fa-book-open"></i>&ensp;閲覧' +
						'</a>'+
						'<button class="ml-2 btn btn-sm btn-danger" onclick="ajaxDeletePost(' + data + ')">'+
							'<i class="fas fa-trash-alt"></i>&ensp;完全削除'+
						'</button>';
					return insert;
				}
			}
		]
	});
}