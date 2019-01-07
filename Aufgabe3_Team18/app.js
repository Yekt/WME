// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/
var jsonArray  = null;
async function csv2json(){
	
	const csv = require('csvtojson')
	const csvFilePath = '\world_data.csv';

	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
		//console.log(jsonObj);
	})
	 
	jsonArray = await csv().fromFile(csvFilePath);
	console.log('Json Array created');
	//console.log(jsonArray);
}
csv2json();
console.log(jsonArray);



/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/
app.get('/items', (req, res) => {
	res.send(JSON.stringify(jsonArray));
	console.log('requested get: /items');
});

// None of the following functions could be tested due to an error that we
// couldn't get rid of
app.get('/items/:id', (req, res) => {
	var id = request.params.id;
	var country = jsonArray.find(entry => entry.id === parseInt(id));
	if (!course) res.status(404).send('No such id ' + id + ' in database.');
	res.send(JSON.stringify(country));
	console.log('requested get: /items/' + id);
});

app.get('/items/:id1/:id2', (req, res) => {
	var id1 = request.params.id1;
	var id2 = request.params.id2;
	var array = [];
	for (i = parseInt(id1); i < parseInt(id2) + 1; i++) {
		var country = jsonArray.find(entry => entry.id === i);
		if(country) array.push(country);
	}
	res.send(JSON.stringify(array));
	console.log('requested get: /items/' + id1 + '/' + id2);
});

app.post('/items', (req, res) => {
	// ..
	res.send(JSON.stringify(jsonArray));
	console.log('requested post: /items');
});

app.delete('/items', (req, res) => {
	var country = jsonArray[jsonArray.count()-1];
	delete jsonArray[country];
	res.send(JSON.stringify(jsonArray));
	console.log('requested delete: /items');
});

app.delete('/items/:id', (req, res) => {
	var id = request.params.id;
	var country = jsonArray.find(entry=>entry.id===input);
	if (!course) res.status(404).send('No such id ' + id + ' in database.');
	delete jsonArray[country];
	res.send(JSON.stringify(jsonArray));
	console.log('requested delete: /items/' + id);
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});