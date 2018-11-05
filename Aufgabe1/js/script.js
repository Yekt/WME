/*
Javascriptoption for Stickynavigation. Further explination in layout.css
https://www.w3schools.com/howto/howto_js_sticky_header.asp

window.onscroll = function() {myFunction()};  

var header = document.getElementById("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
*/

var c2 = true;
var c3 = true;
var c4 = true;
var c5 = true;
var c6 = true;

function hideColumn2() {
	var column = document.getElementsByClassName("column2");
	var head = document.getElementById("column2");
    if(c2){
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.add("hidden");
		}
		head.classList.add("hidden");
		c2 = false;
	}
	else{
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.remove("hidden");
		}
		head.classList.remove("hidden");
		c2 = true;
	}
}

function hideColumn3() {
    var column = document.getElementsByClassName("column3");
	var head = document.getElementById("column3");
    if(c3){
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.add("hidden");
		}
		head.classList.add("hidden");
		c3 = false;
	}
	else{
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.remove("hidden");
		}
		head.classList.remove("hidden");
		c3 = true;
	}
}

function hideColumn4() {
    var column = document.getElementsByClassName("column4");
	var head = document.getElementById("column4");
    if(c4){
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.add("hidden");
		}
		head.classList.add("hidden");
		c4 = false;
	}
	else{
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.remove("hidden");
		}
		head.classList.remove("hidden");
		c4 = true;
	}
}

function hideColumn5() {
    var column = document.getElementsByClassName("column5");
	var head = document.getElementById("column5");
    if(c5){
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.add("hidden");
		}
		head.classList.add("hidden");
		c5 = false;
	}
	else{
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.remove("hidden");
		}
		head.classList.remove("hidden");
		c5 = true;
	}
}

function hideColumn6() {
    var column = document.getElementsByClassName("column6");
	var head = document.getElementById("column6");
    if(c6){
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.add("hidden");
		}
		head.classList.add("hidden");
		c6 = false;
	}
	else{
		for (var i = 0; i < column.length; ++i) {
			var object = column[i];  
			object.classList.remove("hidden");
		}
		head.classList.remove("hidden");
		c6 = true;
	}
}
	
/*https://www.w3schools.com/howto/howto_js_sort_table.asp*/
function sortTableup() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table1");
  switching = true;
  
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortTabledown() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table1");
  switching = true;
  
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}