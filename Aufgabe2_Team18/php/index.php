<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
		<link rel="stylesheet" href="../css/reset.css" type="text/css">
		<link rel="stylesheet" href="../css/layout.css" type="text/css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
		
		<title>World Data</title>
		<meta name="description" content="a list of country data">
		<meta name="author" content="Jean-Luc Rudow, Lukas Sauter">
		<meta name="keywords" content="countries, birth rate, cellphones, electric usage, internet usage">
	</head>
	<body>
		<header>
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
		<div id='page' class='content'>
		
			<h1>World Data Overview ...</h1>
			<div id='flowing_text'>
				This is a placeholder flowing text copied from Wikipedia: 
				In computing, plain text is a loose term for data (e.g. file contents) that represent only characters of readable material but not its graphical representation nor other objects (floating-point numbers, images, etc.). It may also include a limited number of characters that control simple arrangement of text, such as spaces, line breaks, or tabulation characters (although tab characters can "mean" many different things, so are hardly "plain"). Plain text is different from formatted text, where style information is included; from structured text, where structural parts of the document such as paragraphs, sections, and the like are identified); and from binary files in which some portions must be interpreted as binary objects (encoded integers, real numbers, images, etc.). The term is sometimes used quite loosely, to mean files that contain only "readable" content (or just files with nothing that the speaker doesn't prefer). For example, that could exclude any indication of fonts or layout (such as markup, markdown, or even tabs); characters such as curly quotes, non-breaking spaces, soft hyphens, em dashes, and/or ligatures; or other things. In principle, plain text can be in any encoding, but occasionally the term is taken to imply ASCII. As Unicode-based encodings such as UTF-8 and UTF-16 become more common, that usage may be shrinking. 
				from: <a id='wiki_link' href='https://en.wikipedia.org/wiki/Plain_text' target="_blank">Wikipedia</a>
			</div>
			<!--
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
				  <tr class="row1">
					<td class="column0">001</td>
					<td class="column1">Brazil              </td>
					<td class="column2">16.405             </td>
					<td class="column3">90.01936334        </td>
					<td class="column4">1.862             </td>
					<td class="column5">2201.808724                       </td>
					<td class="column6">39.22                </td>
				  </tr>
				  <tr class="row2">
					<td class="column0">002</td>
					<td class="column1">Canada              </td>
					<td class="column2">10.625             </td>
					<td class="column3">70.70997244        </td>
					<td class="column4">1.668             </td>
					<td class="column5">15119.76414                       </td>
				    <td class="column6">80.17086651          </td>
				  </tr>
				  <tr class="row3">
					<td class="column0">003</td>
					<td class="column1">Chile               </td>
					<td class="column2">15.04              </td>
					<td class="column3">97.01862561        </td>
					<td class="column4">1.873             </td>
					<td class="column5">3276.06449                        </td>
					<td class="column6">38.8                 </td>
				  </tr>
				  <tr class="row4">
					<td class="column0">004</td>
					<td class="column1">China               </td>
					<td class="column2">13.536             </td>
					<td class="column3">55.97490921        </td>
					<td class="column4">1.642             </td>
					<td class="column5">2632.724637                       </td>
					<td class="column6">28.97659939          </td>
				  </tr>
				  <tr class="row5">
					<td class="column0">005</td>
					<td class="column1">Colombia            </td>
					<td class="column2">20.605             </td>
					<td class="column3">92.34584564        </td>
					<td class="column4">2.405             </td>
					<td class="column5">1041.994137                       </td>
					<td class="column6">30                   </td>
				  </tr>
				  <tr class="row6">
					<td class="column0">006</td>
					<td class="column1">Ecuador             </td>
					<td class="column2">20.989             </td>
					<td class="column3">92.84925653        </td>
					<td class="column4">2.69              </td>
					<td class="column5">1078.038961                       </td>
					<td class="column6">24.6                 </td>
				  </tr>
				  <tr class="row7">
					<td class="column0">007</td>
					<td class="column1">Egypt               </td>
					<td class="column2">24.83              </td>
					<td class="column3">69.43661504        </td>
					<td class="column4">2.919             </td>
					<td class="column5">1607.918763                       </td>
					<td class="column6">24.28                </td>
				  </tr>
				  <tr class="row8">
					<td class="column0">008</td>
					<td class="column1">Finland             </td>
					<td class="column2">11.127             </td>
					<td class="column3">144.1530224        </td>
					<td class="column4">1.86              </td>
					<td class="column5">15241.61194                       </td>
					<td class="column6">82.53133098          </td>
				  </tr>
				  <tr class="row9">
					<td class="column0">009</td>
					<td class="column1">France              </td>
					<td class="column2">12.21              </td>
					<td class="column3">95.44434226        </td>
					<td class="column4">1.978             </td>
					<td class="column5">7339.946832                       </td>
					<td class="column6">69.0633593           </td>
				  </tr>
				  <tr class="row10">
					<td class="column0">010</td>
					<td class="column1">Germany             </td>
					<td class="column2">8.136              </td>
					<td class="column3">127.4188883        </td>
					<td class="column4">1.376             </td>
					<td class="column5">6753.05764                        </td>
					<td class="column6">79.48523153          </td>
				  </tr>
				  <tr class="row11">
					<td class="column0">011</td>
					<td class="column1">Iceland             </td>
					<td class="column2">14.738             </td>
					<td class="column3">107.6604456        </td>
					<td class="column4">2.123             </td>
					<td class="column5">51259.18763                       </td>
					<td class="column6">92.13686385          </td>
				  </tr>
				  <tr class="row12">
					<td class="column0">012</td>
					<td class="column1">Iraq                </td>
					<td class="column2">31.585             </td>
					<td class="column3">65.47478839        </td>
					<td class="column4">4.276             </td>
					<td class="column5">1086.323768                       </td>
					<td class="column6">1.047516616          </td>
				  </tr>
				  <tr class="row13">
					<td class="column0">013</td>
					<td class="column1">Japan               </td>
					<td class="column2">8.201              </td>
					<td class="column3">91.8955442         </td>
					<td class="column4">1.359             </td>
					<td class="column5">7838.005685                       </td>
					<td class="column6">77.38468963          </td>
				  </tr>
				  <tr class="row14">
					<td class="column0">014</td>
					<td class="column1">Kazakhstan          </td>
					<td class="column2">19.775             </td>
					<td class="column3">107.7147692        </td>
					<td class="column4">2.537             </td>
					<td class="column5">4447.142293                       </td>
					<td class="column6">17.91457965          </td>
				  </tr>
				  <tr class="row15">
					<td class="column0">015</td>
					<td class="column1">Mexico              </td>
					<td class="column2">19.091             </td>
					<td class="column3">74.25785259        </td>
					<td class="column4">2.313             </td>
					<td class="column5">1869.82352                        </td>
					<td class="column6">26.34                </td>
				  </tr>
				  <tr class="row16">
					<td class="column0">016</td>
					<td class="column1">New Zealand         </td>
					<td class="column2">13.831             </td>
					<td class="column3">108.7301521        </td>
					<td class="column4">2.125             </td>
					<td class="column5">9375.550304                       </td>
					<td class="column6">79.82609287          </td>
				  </tr>
				  <tr class="row17">
					<td class="column0">017</td>
					<td class="column1">Nigeria             </td>
					<td class="column2">40.134             </td>
					<td class="column3">48.23561006        </td>
					<td class="column4">6.021             </td>
					<td class="column5">119.8151486                       </td>
					<td class="column6">20                   </td>
				  </tr>
				  <tr class="row18">
					<td class="column0">018</td>
					<td class="column1">Peru                </td>
					<td class="column2">21.342             </td>
					<td class="column3">85.86901405        </td>
					<td class="column4">2.545             </td>
					<td class="column5">1043.052601                       </td>
					<td class="column6">31.4                 </td>
				  </tr>
				  <tr class="row19">
					<td class="column0">019</td>
					<td class="column1">Russia              </td>
					<td class="column2">10.828             </td>
					<td class="column3">161.1162887        </td>
					<td class="column4">1.537             </td>
					<td class="column5">6132.978648                       </td>
					<td class="column6">29.23584146          </td>
				  </tr>
				  <tr class="row20">
					<td class="column0">020</td>
					<td class="column1">Saudi Arabia        </td>
					<td class="column2">23.569             </td>
					<td class="column3">167.3474553        </td>
					<td class="column4">2.898             </td>
					<td class="column5">7430.743897                       </td>
					<td class="column6">38                   </td>
				  </tr>
				  <tr class="row21">
					<td class="column0">021</td>
					<td class="column1">South Africa        </td>
					<td class="column2">22.113             </td>
					<td class="column3">93.33587369        </td>
					<td class="column4">2.5               </td>
					<td class="column5">4532.021902                       </td>
					<td class="column6">10.08745979          </td>
				  </tr>
				  <tr class="row22">
					<td class="column0">022</td>
					<td class="column1">Sweden              </td>
					<td class="column2">11.72              </td>
					<td class="column3">112.1241184        </td>
					<td class="column4">1.937             </td>
					<td class="column5">14143.01101                       </td>
					<td class="column6">91.12326108          </td>
				  </tr>
				  <tr class="row23">
					<td class="column0">023</td>
					<td class="column1">United Arab Emirates</td>
					<td class="column2">14.027             </td>
					<td class="column3">153.7997194        </td>
					<td class="column4">1.903             </td>
					<td class="column5">9998.291079                       </td>
					<td class="column6">64                   </td>
				  </tr>
				  <tr class="row24">
					<td class="column0">024</td>
					<td class="column1">United Kingdom      </td>
					<td class="column2">12.195             </td>
					<td class="column3">130.1742603        </td>
					<td class="column4">1.89              </td>
					<td class="column5">5685.635995                       </td>
					<td class="column6">77.79971962          </td>
				  </tr>
				  <tr class="row25">
					<td class="column0">025</td>
					<td class="column1">United States       </td>
					<td class="column2">14.191             </td>
					<td class="column3">89.14911634        </td>
					<td class="column4">2.002             </td>
					<td class="column5">12913.71143                       </td>
					<td class="column6">71.21181627          </td>
				  </tr>
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
			-->
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
