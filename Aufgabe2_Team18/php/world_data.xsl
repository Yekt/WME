<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
		<head>
			<meta charset="utf-8"></meta>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"></link>
			<link rel="stylesheet" href="../css/reset.css" type="text/css"></link>
			<link rel="stylesheet" href="../css/layout.css" type="text/css"></link>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous"></link>
			
			<title>World Data</title>
			<meta name="description" content="a list of country data"></meta>
			<meta name="author" content="Jean-Luc Rudow, Lukas Sauter"></meta>
			<meta name="keywords" content="countries, birth rate, cellphones, electric usage, internet usage"></meta>
		</head>
		<body>
			<header style="font-family: 'Roboto', sans-serif;">
				<nav id='header'>
					<a href="index.php"><div id="logo"></div></a>
					<ul id='main_menu'>
						<li class='navli' id='leftlist'><a href="index.php"><i class="fas fa-list-ul"></i> A1 - Table</a></li>
						<li class='navli'><a href="parse.php"><i class="fas fa-list-ul"></i> A2 - Parse</a></li>
						<li class='navli'><a href="save.php"><i class="fas fa-list-ul"></i> A2 - Save</a></li>
						<li class='navli'><a href="print.php"><i class="fas fa-list-ul"></i> A2 - Print</a></li>
						<li class='navli'><a href="index.php"><i class="fas fa-list-ul"></i> A3 - REST</a></li>
						<li class='navli'><a href="index.php"><i class="fas fa-list-ul"></i> A4 - Vis</a></li>	
					</ul>
				</nav>
			</header>
			<div id='page' class='content' style="font-family: 'Roboto', sans-serif;">
			
				<h1 style="font-family: 'Roboto', sans-serif;">World Data Overview ...</h1>

				<div id='flowing_text'>
					This is a placeholder flowing text copied from Wikipedia: 
					In computing, plain text is a loose term for data (e.g. file contents) that represent only characters of readable material but not its graphical representation nor other objects (floating-point numbers, images, etc.). It may also include a limited number of characters that control simple arrangement of text, such as spaces, line breaks, or tabulation characters (although tab characters can "mean" many different things, so are hardly "plain"). Plain text is different from formatted text, where style information is included; from structured text, where structural parts of the document such as paragraphs, sections, and the like are identified); and from binary files in which some portions must be interpreted as binary objects (encoded integers, real numbers, images, etc.). The term is sometimes used quite loosely, to mean files that contain only "readable" content (or just files with nothing that the speaker doesn't prefer). For example, that could exclude any indication of fonts or layout (such as markup, markdown, or even tabs); characters such as curly quotes, non-breaking spaces, soft hyphens, em dashes, and/or ligatures; or other things. In principle, plain text can be in any encoding, but occasionally the term is taken to imply ASCII. As Unicode-based encodings such as UTF-8 and UTF-16 become more common, that usage may be shrinking. 
					from: <a id='wiki_link' href='https://en.wikipedia.org/wiki/Plain_text' target="_blank">Wikipedia</a>
				</div>
				
				<div>
					<ul class='hide_bar'>
						<li class='hide_bar_1st'>Show/Hide: </li>
						<li><a href="javascript:void(0)" onclick="hideColumn2();">birth rate</a></li>
						<li><a href="javascript:void(0)" onclick="hideColumn3();">cellphones</a></li>
						<li><a href="javascript:void(0)" onclick="hideColumn4();">child / woman</a></li>
						<li><a href="javascript:void(0)" onclick="hideColumn5();">electrical usage</a></li>
						<li class='hide_bar_last'><a href="javascript:void(0)" onclick="hideColumn6();">internet usage</a></li>
					</ul>
				</div>
						
				<table id='table1'>
					<thead>
						<tr>
							<th id="column0">ID</th>
							<th id="column1">Country 
								<i class="fas fa-angle-up" onclick="sortTableup()" id='up'></i>
								<i class="fas fa-angle-down" onclick="sortTabledown()" id='down'></i>
							</th>
							<th id="column2">birth rate / 1000</th>
							<th id="column3">cellphones / 100</th>
							<th id="column4">children / woman</th>
							<th id="column5">electric usage</th>
							<th id="column6">internet usage</th>
						</tr>
					</thead>
					<tbody>
					<xsl:for-each select="Countries/Country">
						<tr class="row1">
							<td class="column0"><xsl:value-of select ="id"/></td>
							<td class="column1"><xsl:value-of select ="name"/></td>
							<td class="column2"><xsl:value-of select ="birth"/></td>
							<td class="column3"><xsl:value-of select ="cell"/></td>
							<td class="column4"><xsl:value-of select ="children"/></td>
							<td class="column5"><xsl:value-of select ="electric"/></td>
							<td class="column6"><xsl:value-of select ="internet"/></td>
						</tr>
					</xsl:for-each>
					</tbody>
				</table>
					
				<div>
					<ul class='hide_bar'>
						<li class='hide_bar_1st'>Show/Hide: </li>
						<li><a href="javascript:void(0)" onclick="hideColumn2();">birth rate</a></li>
						<li><a href="javascript:void(0)" onclick="hideColumn3();">cellphones</a></li>
						<li><a href="javascript:void(0)" onclick="hideColumn4();">child / woman</a></li>
						<li><a href="javascript:void(0)" onclick="hideColumn5();">electrical usage</a></li>
						<li class='hide_bar_last'><a href="javascript:void(0)" onclick="hideColumn6();">internet usage</a></li>
					</ul>
				</div>
				
				<footer>
					<div id='footerleft'>
						<p>Copyright <i class="far fa-copyright"></i> 2018 world_data</p>
						<p>Second course exercise <b>XML and PHP</b> of the lecture Web and Multimedia Engineering</p>
					</div>
					<div id='footerright'>
						<p>This solution has been created by:</p>
						<p>Team 18 | Jean-Luc Rudow, Lukas Sauter</p>
					</div>
				</footer>
			</div>
			<script src="../js/script.js"></script>
		</body>
		</html>		
</xsl:template>
</xsl:stylesheet> 