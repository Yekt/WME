var json;

function getJson(path){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000' + path,
		async: false,
		success: function(data) {
			alert('success');
			json = JSON.parse(data)
			console.log(json);
			fillTable(json);
		}, error: function(jqXHR, text, err) {
			alert('There was an error trying to load the data.');
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


function removeCountry(){
	var input = document.getElementById("country_delete_id").value;

	var country = json.find(entry=>entry.id===input);
	delete json[country];
	fillTable();
	
}
