'use strict'

var dataTable = null;

function filterColumn(col){
	let searchText = event.currentTarget.value;
	$('#dataTable')
		.DataTable()
		.column(col)
		.search(
			searchText
		)
		.draw();
}

/** DataTables初期設定 */
function setDataTablesStatus(operationCol, dateCol){
	$.extend( $.fn.dataTable.defaults, {
	    language: {
	        url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
	    },
	    lengthMenu: [ 10, 20, 30, 40, 50 ],
	    displayLength: 10
	});

	if(operationCol !== undefined){
		$.extend( $.fn.dataTable.defaults, {
			columnDefs: [{
				"targets": operationCol,
				"orderable": false,
				"searchable": false
			}]
		});
	}

	if(dateCol !== undefined){
		$.extend( $.fn.dataTable.defaults, {
			"order": [ dateCol, "desc" ]
		});
	}
}