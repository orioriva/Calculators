$('input[type=checkbox]').change(function() {
	if($(this).prop('checked')){
		$('#selectFormula').show("normal");
	}else{
		$('#selectFormula').hide("normal");
	}
});

/** 送信ボタンが押された時 */
$('#send-btn').click(function (){
	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	var formData = $('#input-form').serializeArray();

	$.ajax({
		type : "POST",
		cache : false,
		url : '/bbs/post/update/rest',
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
			window.location.href = '/bbs/post?postId=' + $('#postFormula').val();
		}
	}).fail(function(jqXHR, testStatus, errorThrown){
		alert('情報送信に失敗しました');
	});
});