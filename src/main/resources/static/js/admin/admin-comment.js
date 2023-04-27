'use strict'

setDataTablesStatus(7,4);

/** ポップアップを閉じる時 */
$('.popup-file').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup-file').fadeOut();
	}
});
$('#close-file').click(function() {
    $('.popup-file').fadeOut();
});

/** 内容表示用vueインスタンス */
const vmForm = Vue.createApp({
	data(){
		return{
			postData: null,
			comments: [],
			selectNo: 0
		}
	},
	methods: {
		setSelectNo(no){
			this.selectNo = no;
		},
		setPostData(data){
			this.postData = data;
		},
		setComments(data) {
			this.comments = [];
			data.forEach(element => this.comments.push(element));
		},
		formatDate: function(date){
			return dateToTextDef(new Date(date));
		}
	},
	mounted(){
	}
}).mount('#popup-body')

/** ページの読み込みが終わったら */
$(document).ready(function () {
	ajaxGetCommentList();
});

/** コメント一覧取得 */
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

/** コメントツリー取得 */
function ajaxGetPostComments(postId, no){
	// 投稿内容取得
	setAjax(
		'GET',
		'/rest/posts/' + postId,
		{},
		function(data){
			vmForm.setPostData(data);
		}
	);

	// 投稿内コメント一覧取得
	setAjax(
		'GET',
		'/rest/comments',
		{
			postId: postId
		},
		function(data){
			vmForm.setComments(data);
		}
	);
	vmForm.setSelectNo(no);
	$('.popup-file').addClass('popup-show').fadeIn();
}

/** コメントの表示非表示切り替え */
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
			{
				data: 'posterName',
				render: function(data){
					return data != null ? data : '<div class="text-black-50">※ 退会済 ※</div>';
				}
			},
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
			},
			{
				data: 'postId',
				render: function(data,type,row){
					let insert =
						'<button class="ml-2 btn btn-sm btn-primary" onclick="ajaxGetPostComments('+data+','+row.no+')">'+
							'<i class="fas fa-search"></i>&ensp;スレッド表示'+
						'</button>';
					return insert;
				}
			}
		]
	});
}