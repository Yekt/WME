var json;
getJson('/items');


function filterId(){
	var inputId = document.getElementById("country_filter_id").value.toString();
	var inputRange = document.getElementById("country_filter_range").value.toString();
	console.log('filterId was called with id:  ' + inputId + '     filterRange was called with id:  ' + inputRange);
	path = '/items';
	var count = json.length;
	var legitimate = true;
	// prioritize filter by Id over filter by range.
	if(inputId){
		if(0 < parseInt(inputId) <= count){
			path += '/' + inputId;
		}
		else {
			alert('No such id ' + inputId + ' in database.');
			legitimate = false;
		}
	}
	else if(inputRange && inputRange.includes('-')) {
		var array = inputRange.split('-');
		if(array.length == 2
			&& parseInt(array[0]) < parseInt(array[1])
			&& 0 < parseInt(array[0]) < count
			&& 1 < parseInt(array[1]) <= count){
			path += '/' + array[0] + '/' + array[1];
		}
		else {
			alert('Range not possible.')
			legitimate = false;
		}
	}
	else {
		// If both inputs are empty it's impossible to say if the user was searching by
		// Id or by Range.
		alert('No such id ' + inputId + ' in database OR range not possible.')
		legitimate = false;
	}
	if (legitimate) {
		getJson(path);
	}
	return false;
}


function removeCountry(){
	var input = document.getElementById("country_delete_id").value;

	var country = json.find(entry=>entry.id===input);
	delete json[country];
}









function getJson(path){
	console.log('getJson was called with path:  ' + path);
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000' + path,
		async: true,
		success: function(data) {
			//alert('success');
			json = JSON.parse(data)
			console.log(json);
			fillTable();
		}, error: function(jqXHR, text, err) {
			//alert('There was an error trying to load the data.');
		}
	});
}

function postJson(path){
	console.log('postJson was called with path:  ' + path);
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000' + path,
		async: true,
		success: function(data) {
			//alert('success');
			json = JSON.parse(data)
			console.log(json);
			fillTable();
		}, error: function(jqXHR, text, err) {
			//alert('There was an error trying to load the data.');
		}
	});
}

function deleteJson(path){
	console.log('deleteJson was called with path:  ' + path);
	$.ajax({
		type: 'DELETE',
		url: 'http://localhost:3000' + path,
		async: true,
		success: function(data) {
			//alert('success');
			json = JSON.parse(data)
			console.log(json);
			fillTable();
		}, error: function(jqXHR, text, err) {
			//alert('There was an error trying to load the data.');
		}
	});
}




function fillTable(){	
	var table = '';
	for (row = 0; row < json.length; row++) {
		country = json[row];
		table += '<tr>';
		table += '<td>'+ country.id +'</td>';
		table += '<td>'+ country.name +'</td>';
		table += '<td>'+ country.birth_rate_per_1000 +'</td>';
		table += '<td>'+ country.cell_phones_per_100 +'</td>';
		table += '<td>'+ country.children_per_woman +'</td>';
		table += '<td>'+ country.electricity_consumption_per_capita +'</td>';
		table += '<td>'+ country.internet_user_per_100 +'</td>';
		table += '</tr>';
	}
	document.getElementById("table_body").innerHTML = table;
}
