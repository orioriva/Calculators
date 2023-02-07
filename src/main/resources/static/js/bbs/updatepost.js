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

/** 投稿する計算表を変更するスイッチが押された時 */
$('input[type=checkbox]').change(function() {
	if($(this).prop('checked')){
		$('#selectFormula').animate({height:'show', opacity:'show'},'normal');
	}else{
		$('#selectFormula').animate({height:'hide', opacity:'hide'},'normal');
	}
});

/** 送信ボタンが押された時 */
$('#send-btn').click(function (){
	// バリデーション結果をクリア
	removeValidResult();

	// フォームの値を取得
	var formData = $('#input-form').serializeArray();

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
});