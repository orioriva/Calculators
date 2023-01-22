/** 日付をYYYY/MM/DD形式にフォーマットする */
function formatDate(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1);
    format = format.replace(/DD/, date.getDate());
    format = format.replace(/hh/, date.getHours());
    format = format.replace(/mm/, date.getMinutes());
    return format;
}

function dateToTextDef(date){
	return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate() + "　" + date.getHours() + ":" + date.getMinutes();
}