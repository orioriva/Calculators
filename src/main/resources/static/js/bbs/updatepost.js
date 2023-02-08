/** 投稿する計算表を変更するスイッチが押された時 */
$('input[type=checkbox]').change(function() {
	if($(this).prop('checked')){
		$('#selectFormula').animate({height:'show', opacity:'show'},'normal');
	}else{
		$('#selectFormula').animate({height:'hide', opacity:'hide'},'normal');
	}
});