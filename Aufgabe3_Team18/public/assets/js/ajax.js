$.ajax({
	type: 'GET',
	url: 'http://localhost:3000/json',
	async: true,
	success: function(data) {
		alert('success');
		console.log(data);
	}, error: function(jqXHR, text, err) {
		alert('There was an error trying to load the data.');
	}
});
//alert('TEST ALERT');
