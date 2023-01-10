'use strict'

var dataTable = null;

//DataTables日本語化
$.extend( $.fn.dataTable.defaults, {
    language: {
        url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
    }
});

$(document).ready(function () {
	createDataTable();
});

function filterColumn(i) {
	$('#dataTable')
		.DataTable()
		.column(i)
		.search(
			event.currentTarget.value
			//$('#col' + i + '_filter').val(),
			//$('#col' + i + '_regex').prop('checked'),
			//$('#col' + i + '_smart').prop('checked')
		)
		.draw();
}

function createDataTable(){
	//既にdataTableが定義されていれば削除
	if(dataTable !== null){
		dataTable.destroy();
	}

	dataTable = $('#dataTable').DataTable({
		sDom: 'lrtip'
	});
}