'use strict'

/** リクエストパラメータから値取得 */
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/** バリデーション結果をクリア */
function removeValidResult(){
	$('.is-invalid').removeClass('is-invalid');
	$('.invalid-feedback').remove();
	$('.text-danger').remove();
}

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
	$.ajax({
		type : "GET",
		cache : false,
		url : '/rest/posts',
		data : {
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		createDataTable(data);
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});
}

/** 自身の投稿一覧取得 */
function ajaxGetMyPostList(){
	$.ajax({
		type : "GET",
		cache : false,
		url : '/rest/posts/myposts',
		data : {
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		createDataTable(data);
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});
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

	$.ajax({
		type : "POST",
		cache : false,
		url : '/rest/posts',
		data : formData,
		dataType : 'json'
	}).done(function(data){
		if(data.result == 90){
			// validationエラー時の処理
			$.each(data.errors, function(key, value){
				reflectValidResult(key, value)
			});
		}else if(data.result == 999){
			alert("データベースへの追加に失敗しました");
		}else if(data.result == 0){
			alert("投稿完了しました");
			window.location.href = '/bbs';
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});

	return false;
}

/** 投稿内容更新 */
function ajaxUpdatePost(){
	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	let formData = $('#input-form').serializeArray();

	$.ajax({
		type : "PUT",
		cache : false,
		url : '/rest/posts',
		data : formData,
		dataType : 'json'
	}).done(function(data){
		if(data.result == 90){
			// validationエラー時の処理
			$.each(data.errors, function(key, value){
				reflectValidResult(key, value)
			});
		}else if(data.result == 999){
			alert("データベース更新に失敗しました");
		}else if(data.result == 0){
			alert("更新完了しました");
			window.location.href = '/bbs/post?postId=' + getParam('postId');
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});

	return false;
}

/** 投稿削除 */
function ajaxDeletePost(postId){
	if(!confirm("本当にこの投稿を削除してよろしいですか？")){
		return false;
	}

	// ajax通信
	$.ajax({
		type : "DELETE",
		cache : false,
		url : '/rest/posts',
		data : {
			id : postId,
			_csrf: $("*[name=_csrf]").val()  // CSRFトークンを送信
		},
		dataType : 'json'
	}).done(function(data){
		if(!data){
			alert('削除出来ませんでした');
			return false;
		}
		alert('投稿を削除しました');
		deletePostAfter();
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});

	return false;
}