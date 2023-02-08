'use strict'

/** ID変更のスイッチが押された時 */
$('#changeId').change(function() {
	if($(this).prop('checked')){
		$('#newIdArea').animate({height:'show', opacity:'show'},'normal');
		$('#confirmArea').animate({height:'show', opacity:'show'},'normal');
	}else{
		$('#newIdArea').animate({height:'hide', opacity:'hide'},'normal');
		if(!$('#changePassword').prop('checked')){
			$('#confirmArea').animate({height:'hide', opacity:'hide'},'normal');
		}
	}
});

/** パスワード変更のスイッチが押された時 */
$('#changePassword').change(function() {
	if($(this).prop('checked')){
		$('#newPasswordArea').animate({height:'show', opacity:'show'},'normal');
		$('#confirmArea').animate({height:'show', opacity:'show'},'normal');
	}else{
		$('#newPasswordArea').animate({height:'hide', opacity:'hide'},'normal');
		if(!$('#changeId').prop('checked')){
			$('#confirmArea').animate({height:'hide', opacity:'hide'},'normal');
		}
	}
});