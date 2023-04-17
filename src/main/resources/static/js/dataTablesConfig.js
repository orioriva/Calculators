'use strict'

var dataTable = null;

/** DataTables初期設定 */
function setDataTablesStatus(operationCol, dateCol){
	$.extend( $.fn.dataTable.defaults, {
	    language: {
	        url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
	    },
	    lengthMenu: [ 10, 20, 30, 40, 50 ],
	    displayLength: 10,
	    columnDefs: [{
			  "targets": operationCol,
			  "orderable": false,
			  "searchable": false
		}]
	});

	if(dateCol !== undefined){
		$.extend( $.fn.dataTable.defaults, {
			"order": [ dateCol, "desc" ]
		});
	}
}