<?php 
	include ("world_data_parser.php");
	
	$wdp = new WorldDataParser();
	
	$parseResult = $wdp::parseCSV("../res/world_data_v1.csv");
	$saveResult = $wdp::saveXML( $parseResult );
	if(!$saveResult){
		echo("There was a problem creating the requested XML file!");
	}
	else{
		$printResult = WorldDataParser::printXML("world_data.xml", "world_data.xsl");
		echo '<pre>';
		print_r($printResult);
		echo '</pre>';
	}
?>