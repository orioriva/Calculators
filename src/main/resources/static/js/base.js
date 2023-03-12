/** 日付をYYYY/MM/DD形式にフォーマットする */
function formatDate(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1).padStart(2, "0");
    format = format.replace(/DD/, date.getDate()).padStart(2, "0");
    format = format.replace(/hh/, date.getHours()).padStart(2, "0");
    format = format.replace(/mm/, date.getMinutes()).padStart(2, "0");
    return format;
}

function dateToTextDef(date){
	let str =
		date.getFullYear() + " / " +
		(date.getMonth() + 1).toString().padStart(2, "0") + " / " +
		date.getDate().toString().padStart(2, "0") + "　" +
		date.getHours().toString().padStart(2, "0") + ":" +
		date.getMinutes().toString().padStart(2, "0");
	return str;
}

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