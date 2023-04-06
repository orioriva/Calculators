'use strict'

// カテゴリーリストが取得出来た時に呼び出す関数
var addCategoryListFunc = null;

/** バリデーション結果の反映 */
function reflectValidResult(key, value){
	// CSS適用
	switch(key){
		case 'postFormula':
			$('#titleText').addClass('is-invalid');
			break;
		case 'category':
			$('select[name=' + key +']').addClass('is-invalid');
			break;
		default:
			$('input[name=' + key +']').addClass('is-invalid');
			break;
	}
	// エラーメッセージ追加
	$('#errorMsg').append('<div class="text-danger">' + value + '</div>');
	window.scrollTo({top: 0, behavior: 'smooth'});
}

/** カテゴリーリスト取得 */
function ajaxGetCategoryList(){
	setAjax(
		'GET',
		'/rest/category',
		{},
		function(data){
			console.log(data);
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

/** 自身の投稿内容１件取得 */
function ajaxGetMyPost(postId){
	if(!postId){
		return;
	}

	setAjax(
		'GET',
		'/rest/posts/mypost',
		{
			_csrf: $("*[name=_csrf]").val(),  // CSRFトークンを送信
			postId: postId
		},
		function(data){
			vmForm.init(data);
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
	if(!confirm("この内容で更新してよろしいですか？")){
		return false;
	}

	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	let formData = $('#input-form').serializeArray();
	formData.push({
		name: 'postId',
		value: getParam("postId")
	});

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