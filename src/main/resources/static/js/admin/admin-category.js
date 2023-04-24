'use strict'

/** ファイルを閉じる時 */
$('.popup-file').click(function(e){
    if(!$(e.target).closest('.content').length){
		$('.popup-file').fadeOut();
	}
});
$('#close-file').click(function() {
    $('.popup-file').fadeOut();
});

/** フォームの初期値をセット */
function setCategoryDataFromId(id){
	vmInputForm.init(id);
	$('.popup-file').addClass('popup-show').fadeIn();
}

/** カテゴリ情報編集用vueインスタンス */
const vmTable = Vue.createApp({
	data(){
		return{
			options: []
		}
	},
	methods: {
		init(id){
			vmInputForm.init(id);
		},
		addOption(options) {
			options.forEach(element => this.options.push(element))
		}
	}
}).mount('#dataTable')

const vmInputForm = Vue.createApp({
	data(){
		return{
			id: 0,
			name: '',
			options: vmTable.options
		}
	},
	methods: {
		init(id){
			let data = vmTable.options.find((v) => v.id == id);
			this.id = data.id;
			this.name = data.name;
			$('.popup-file').addClass('popup-show').fadeIn();
		},
		filterOptions(){
			return this.options.filter(v => v.id !== this.id);
		}
	}
}).mount('#input-form')

/** ページの読み込みが終わったら */
$(document).ready(function () {
	ajaxGetCategoryList();
});

/** カテゴリーリスト取得 */
function ajaxGetCategoryList(){
	setAjax(
		'GET',
		'/rest/category',
		{},
		function(data){
			vmTable.addOption(data);
		}
	);
}