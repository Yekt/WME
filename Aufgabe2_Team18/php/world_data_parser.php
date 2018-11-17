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
	
	
	function saveXML( $parseResult ) {
		$xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><Countries></Countries>');
		
		foreach( $parseResult as $countryKey => $countryArray ){
			$child = $xml->addChild("Country");
			foreach( $countryArray as $key => $value ){
				$key = trim($key);
				$value = trim($value);
				if( strcmp ($key, "birth rate per 1000") == 0 ) $key = "birth";
				else if( strcmp ($key, "cell phones per 100") == 0 ) $key = "cell";
				else if( strcmp ($key, "children per woman") == 0 ) $key = "children";
				else if( strcmp ($key, "electricity consumption per capita") == 0 ) $key = "birth";
				else if( strcmp ($key, "inflation annual") == 0 ) $key = "inflation";
				else if( strcmp ($key, "internet user per 100") == 0 ) $key = "internet";
				else if( strcmp ($key, "life expectancy") == 0 ) $key = "life";
				else if( strcmp ($key, "military expenditure percent of gdp") == 0 ) $key = "military";
				$child->addChild( htmlspecialchars($key), htmlspecialchars($value) );
			}
		}		
		//https://solvit.io/8e2132e
		$dom = new DOMDocument('1.0');
		$dom->preserveWhiteSpace = false;
		$dom->formatOutput = true;
		$dom->loadXML($xml->asXML());
		$ret = $dom->save('world_data.xml');
		
		return $ret;
	}
	
	
	function printXML() {
		
	}
}
?>
