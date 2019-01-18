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
var json;
async function csv2json(){
	
	const csv = require('csvtojson')
	const csvFilePath = '\world_data.csv';

	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
		//console.log(jsonObj);
	})
	 
	json = await csv().fromFile(csvFilePath);
	for(var i = 0; i < json.length; i++) {
		// trimm json data
		delete json[i].id;
		delete json[i].gdp_per_capita_growth;
		delete json[i].inflation_annual;
		delete json[i].life_expectancy;
		delete json[i].military_expenditure_percent_of_gdp;
	}
	console.log(json);
	console.log('Json Array created');
}
csv2json();



/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/
app.get('/json', (req, res) => {
	res.send(JSON.stringify(json));
	console.log('requested get: /json');
});



// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});