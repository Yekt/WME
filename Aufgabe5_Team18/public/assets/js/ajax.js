
// Load data
var json;

$.ajax({
	type: 'GET',
	url: 'http://localhost:3000/json',
	async: true,
	success: function(data) {
		//alert('success');
		json = JSON.parse(data)
		loaded = true;
		console.log(json);
		console.log('Json was successfully received from server!');
	}, error: function(jqXHR, text, err) {
		console.log('An error accured while trying to receive Json from server!');
		alert('There was an error trying to load the data.');
	}
});


// Update meshes
let meshes = [];
let loaded = false;
let selected = ''; // changes with radio buttons
var material = new THREE.MeshLambertMaterial({color: 0xff0000});
// TODO Funktion, die selected ändert, wenn ein anderes Attribut angezeigt werden soll
function updateMeshes() {
	if(loaded) meshes = [];
	else loaded = true;
	//var material = new THREE.MeshLambertMaterial({color: different color});
	let highest = 0;
	// find highest number
	for(let country of json) {
		let value = country.selected;
		if(value > highest) highest = value;
	}
	// calculate height and add to mesh
	for(let country of json) {
		let value = country.selected;
		let ratio = value / highest;
		let geometry = new THREE.BoxGeometry(25, 25, 100 * ratio);
		let mesh = new THREE.Mesh(geometry, material);
		meshes.push(mesh);
	}
}


// Scene Configurations
let viewPortWidth = window.innerWidth;
let viewPortHeight = window.innerHeight;
console.log('View Port size: ' + viewPortWidth + 'x' + viewPortHeight);
let WIDTH = 1170; //1170
let HEIGHT = viewPortHeight - 90;
let VIEW_ANGLE = 45;
let ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;


// Scene, camera, canvas, renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var canvas = document.getElementById("mapa");
var renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas, antialias: true});

camera.position.z = 300;
scene.add(camera);
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x707070);


// Light
var light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(0, 0, 6);
scene.add(light);


// MapboxGL
//const key = 'pk.eyJ1IjoicmljYXJkb2xhbmduZXIiLCJhIjoiY2pxano2enh2MG1qazN4bm5lajIzeDl3eiJ9.wK0MtuxLgJxDcGUksKMeKgb';
const key = 'pk.eyJ1IjoicGlra3UiLCJhIjoiY2pwenloamxoMDl0djQybWxlY3hkaGVpZSJ9.MKRV1BETvooEv5r_dEaXTQ';

var options = {
    lat: 0,
    lng: 0,
    zoom: 4,
    pitch: 25
}

var mappa = new Mappa('MapboxGL', key);
var myMap = mappa.tileMap(options);
myMap.overlay(canvas);


// Upate mesch position
myMap.onChange(update);
function update() {
    if(loaded){
        meshes.forEach(function(mesh, item){
            var pos = myMap.latLngToPixel(json[item].lat , json[item].lng);
            var vector = new THREE.Vector3();
            vector.set((pos.x / WIDTH) * 2 - 1, -(pos.y / HEIGHT) * 2 + 1, 0.5);
            vector.unproject(camera);
            var dir = vector.sub(camera.position).normalize();
            var distance = -camera.position.z / dir.z;
            var newPos = camera.position.clone().add(dir.multiplyScalar(distance));

            mesh.position.set(newPos.x, newPos.y, newPos.z);
            scene.add(mesh);
        })
    }
}
