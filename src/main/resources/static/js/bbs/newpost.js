/** 送信ボタンが押された時 */
$('#send-btn').click(function (){
	if(!confirm("この内容で投稿してよろしいですか？")){
		return;
	}

	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	var formData = $('#input-form').serializeArray();

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
	}).always(function(){
	});
});