'use strict'

/** ページ遷移前の確認 */
window.onbeforeunload = function(event){
    event.returnValue = 'ページを離れますか？\r\n保存していない内容は破棄されます！';
};

/** 操作ガイドボタンが押された時 */
$("#guide-btn").click(function() {	
    $('.popup').addClass('popup-show').fadeIn();
});

/** 操作ガイドを閉じる時 */
$('.popup').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup').fadeOut();
	}
});
$('#close').click(function() {
    $('.popup').fadeOut();
});

/** 全消去ボタンが押された時 */
$('#delete-btn').click(function() {
    if(confirm("本当に全て削除しますか？")){
        allDelete();
    }
});

// クリップボードへコピー（コピーの処理）
function copyToClipboard (text) {
    if (navigator.clipboard) { // navigator.clipboardが使えるか判定する
        return navigator.clipboard.writeText(text).then(function () { // クリップボードへ書きむ
            alert("クリップボードに書き込みました");
        });
    } else {
        alert("お使いの環境ではこの機能を使用できません");
    }
}