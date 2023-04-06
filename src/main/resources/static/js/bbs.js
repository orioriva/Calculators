'use strict'

/** DataTables初期設定 */
setDataTablesStatus(4,3);

/** 投稿用vueインスタンス */
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

/** 絞り込みボタンが押されたら */
function toggleSearchForm(){
	$('#search-form').animate({height:'toggle', opacity:'toggle'},'normal');
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
			// タイトル
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
			// 操作
			{
				data: 'id',
				render: function(data,type,row){
					let insert =
						'<a href="/bbs/post?postId=' + data + '" class="btn btn-sm btn-info" role="button">' +
							'<i class="fas fa-book-open"></i>&ensp;閲覧' +
						'</a>';
					return insert;
				}
			}
		]
	});
}