'use strict'

/** バリデーション結果の反映 */
function reflectValidResult(key, value){
	// CSS適用
	if(key == 'postFormula'){
		$('#titleText').addClass('is-invalid');
	}else if(key == 'category'){
		$('select[id=' + key +']').addClass('is-invalid');
	}else{
		$('input[id=' + key +']').addClass('is-invalid');
	}
	// エラーメッセージ追加
	$('#errorMsg').append('<div class="text-danger">' + value + '</div>');
}

/** 投稿一覧取得 */
function ajaxGetPostList(){
	setAjax(
		'GET',
		'/rest/posts',
		{
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			createDataTable(data);
		}
	);
}

/** 自身の投稿一覧取得 */
function ajaxGetMyPostList(){
	setAjax(
		'GET',
		'/rest/posts/myposts',
		{
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			createDataTable(data);
		}
	);
}

/** 新規投稿 */
function ajaxAddPost(){
	if(!confirm("この内容で投稿してよろしいですか？")){
		return false;
	}

	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	let formData = $('#input-form').serializeArray();
	
	setAjax(
		'POST',
		'/rest/posts',
		formData,
		function(data){
			if(data.result == 90){
				// validationエラー時の処理
				$.each(data.errors, function(key, value){
					reflectValidResult(key, value)
				});
			}else if(data.result == 0){
				alert("投稿完了しました");
				window.location.href = '/bbs';
			}else{
				errorCodeCheck(data.result);
			}
		}
	);

	return false;
}

/** 投稿内容更新 */
function ajaxUpdatePost(){
	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	let formData = $('#input-form').serializeArray();
	
	setAjax(
		'PUT',
		'/rest/posts',
		formData,
		function(data){
			if(data.result == 90){
				// validationエラー時の処理
				$.each(data.errors, function(key, value){
					reflectValidResult(key, value)
				});
			}else if(data.result == 0){
				alert("更新完了しました");
				window.location.href = '/bbs/post?postId=' + getParam('postId');
			}else{
				errorCodeCheck(data.result);
			}
		}
	);

	return false;
}

/** 投稿削除 */
function ajaxDeletePost(postId){
	if(!confirm("本当にこの投稿を削除してよろしいですか？")){
		return false;
	}
	
	setAjax(
		'DELETE',
		'/rest/posts',
		{
			id : postId,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		function(data){
			if(!data){
				alert('削除出来ませんでした');
				return false;
			}
			alert('投稿を削除しました');
			deletePostAfter();
		}
	);

	return false;
}