<?php 
	include ("world_data_parser.php");
	
	$wdp = new WorlDataParser();
	
	$resultArray = $wdp::parseCSV("../res/world_data_v1.csv"); // TODO? 
	echo '<pre>';
	print_r($resultArray);
	echo '</pre>';
?>