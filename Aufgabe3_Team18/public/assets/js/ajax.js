function getJson(path){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000' + path,
		async: true,
		success: function(data) {
			alert('success');
			console.log(data);
			fillTable(data);
		}, error: function(jqXHR, text, err) {
			alert('There was an error trying to load the data.');
		}
	});
}

function fillTable(data){
	for (row = 0; row < data.length; row++) {
		for (col = 0; col < data[row].length; col++) {
			
			document.write();
			
		}
	}
}
