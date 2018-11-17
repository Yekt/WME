<?php 
	include ("world_data_parser.php");
	
	$parse = WorldDataParser::parseCSV();
	$save = WorldDataParser::saveXML(parse);
	$print = WorldDataParser::printXML(save);
	echo(print);
?>