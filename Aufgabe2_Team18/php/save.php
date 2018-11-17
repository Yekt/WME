<?php 
	include ("world_data_parser.php");
	
	$wdp = new WorlDataParser();
	
	$parseResult = $wdp::parseCSV("../res/world_data_v1.csv");
	$saveResult = $wdp::saveXML($parseResult);
	if($saveResult) echo("The requested XML file was successfully created!");
	else echo("There was a problem creating the requested XML file!");
?>
