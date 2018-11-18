<?php 
	include ("world_data_parser.php");
	
	$wdp = new WorldDataParser();
	
	$parseResult = $wdp::parseCSV("../res/world_data_v1.csv"); 
	echo '<pre>';
	print_r($parseResult);
	echo '</pre>';
?>
