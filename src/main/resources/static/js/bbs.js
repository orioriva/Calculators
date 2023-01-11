'use strict'

var dataTable = null;

//DataTables日本語化
$.extend( $.fn.dataTable.defaults, {
    language: {
        url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
    },
    lengthMenu: [ 10, 20, 30, 40, 50 ],
    displayLength: 10,
    columnDefs: [{
		  "targets": 4,
		  "orderable": false,
		  "searchable": false
	}]
});

$(document).ready(function () {
	createDataTable();
});

function filterColumn(col) {
	let searchText = event.currentTarget.value;
	$('#dataTable')
		.DataTable()
		.column(col)
		.search(
			searchText
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