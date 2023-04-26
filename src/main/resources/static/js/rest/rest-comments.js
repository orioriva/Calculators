'use strict'

/** コメント一覧取得 */
function ajaxGetCommentList(){
	setAjax(
		'GET',
		'/rest/comments',
		{
			postId: getParam('postId')
		},
		function(data){
			setCommentList(data);
		}
	);
}

/** コメント追加 */
function ajaxAddComment(postId, comment){
	if(!confirm("この内容で投稿してよろしいですか？")){
		return false;
	}

	// バリデーション結果をクリア
	removeValidResult();

	setAjax(
		'POST',
		'/rest/comment',
		{
			postId: postId,
			comment: comment,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(data.result == 90){
				$.each(data.errors, function(key, value){
					// CSS適用
					$('textarea').addClass('is-invalid');
					// エラーメッセージ追加
					$('textarea').parent().append('<div class="text-danger">' + value + '</div>');
				});
			}else if(data.result == 0){
				alert("投稿完了しました");
				window.location.reload();
			}else{
				errorCodeCheck(data.result);
			}
		}
	);

	return false;
}