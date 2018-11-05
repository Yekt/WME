/*
Javascriptvariante für Stickynavigation. Erklärung im layout.css

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
		column.classList.add("hidden");
		head.classList.add("hidden");
		c2 = false;
	}
	else{
		column.classList.remove("hidden");
		head.classList.remove("hidden");
		c2 = true;
	}
}

function hideColumn3() {
    var column = document.getElementsByClassName("column3");
	var head = document.getElementById("column3");
    if(c2){
		column.classList.add("hidden");
		head.classList.add("hidden");
		c2 = false;
	}
	else{
		column.classList.remove("hidden");
		head.classList.remove("hidden");
		c2 = true;
	}
}

function hideColumn4() {
    var column = document.getElementsByClassName("column4");
	var head = document.getElementById("column4");
    if(c2){
		column.classList.add("hidden");
		head.classList.add("hidden");
		c2 = false;
	}
	else{
		column.classList.remove("hidden");
		head.classList.remove("hidden");
		c2 = true;
	}
}

function hideColumn5() {
    var column = document.getElementsByClassName("column5");
	var head = document.getElementById("column5");
    if(c2){
		column.classList.add("hidden");
		head.classList.add("hidden");
		c2 = false;
	}
	else{
		column.classList.remove("hidden");
		head.classList.remove("hidden");
		c2 = true;
	}
}

function hideColumn6() {
    var column = document.getElementsByClassName("column6");
	var head = document.getElementById("column6");
    if(c2){
		column.classList.add("hidden");
		head.classList.add("hidden");
		c2 = false;
	}
	else{
		column.classList.remove("hidden");
		head.classList.remove("hidden");
		c2 = true;
	}
}