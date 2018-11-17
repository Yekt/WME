<?php 
class WorlDataParser {
    
    function parseCSV( $path ) {
			$retArray = [];
			$csvFile = fopen( $path, "r");
			if( !$csvFile ) array_push($retArray, "Error loading the csv file!");
			//https://stackoverflow.com/questions/10181054/process-csv-into-array-with-column-headings-for-key
			$tableHead = fgetcsv( $csvFile, ",");
			while ($rowArray = fgetcsv($csvFile)) {
				$retArray[] = array_combine($tableHead, $rowArray);
			}
			return $retArray;
    } 
	
	function saveXML() {
		$ret = false;
		
		return $ret;
	}
	
	function printXML() {
		
	}
}
?>