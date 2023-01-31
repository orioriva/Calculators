'use strict'

function ajaxDeletePost(postId){
	if(!confirm("本当にこの投稿を削除してよろしいですか？")){
		return;
	}

	// ajax通信
	$.ajax({
		type : "DELETE",
		cache : false,
		url : '/bbs/post/delete/rest',
		data : {
			id : postId,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		if(!data){
			alert('削除出来ませんでした');
			return;
		}
		alert('投稿を削除しました');
		window.location.href = '/bbs';
	}).fail(function(jqXHR, testStatus, errorThrown){
		// ajax失敗時の処理
		alert('情報送信に失敗しました');
	});
}