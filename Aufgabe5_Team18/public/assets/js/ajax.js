
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
let highest_value = 0;
var material = new THREE.MeshLambertMaterial({color: 0xffffff});

function updateMeshes() {
	// https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
	var radio = document.getElementsByName('selection');
	for(var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			selected = radio[i].value;
			break;
		}
	}
	
	highest_value = 0;
	for(var i = 0; i < json.length; i++) {
		let value = getValue(json[i]);
		if(value >= highest_value) highest_value = value;
	}
	
	// change color
	switch(selected) {
		case 'birth':
			material = new THREE.MeshLambertMaterial({color: 0xff0000});
			break;
		case 'children':
			material = new THREE.MeshLambertMaterial({color: 0x00ff00});
			break;
		case 'gdp':
			material = new THREE.MeshLambertMaterial({color: 0x0000ff});
			break;
		case 'electricity':
			material = new THREE.MeshLambertMaterial({color: 0xffff00});
			break;
		case 'internet':
			material = new THREE.MeshLambertMaterial({color: 0xff00ff});
			break;
		case 'phones':
			material = new THREE.MeshLambertMaterial({color: 0x00ffff});
			break;
		default:
			material = new THREE.MeshLambertMaterial({color: 0xffffff});
			break;
	}
	
	// remove old meshes
	if(loaded) {
		for(var mesh of meshes) {
			scene.remove(mesh);
		}
		meshes = [];
	}
	
	// calculate height and add to mesh
	for(var i = 0; i < json.length; i++) {
		let value = getValue(json[i]);
		let ratio = value / highest_value;
		let bar = new THREE.BoxGeometry(10, 10, 50 * ratio);
		let mesh = new THREE.Mesh(bar, material);
		mesh.name = json[i].name + ';' + value;		
		meshes.push(mesh);
	}
	console.log('Meshes updated for ' + selected + '!');
	loaded = true;
	update();
}

function getValue(o) {
	let value;
	switch(selected) {
		case 'birth':
			value = o.birth_rate_per_1000;
			break;
		case 'children':
			value = o.children_per_woman;
			break;
		case 'gdp':
			value = o.gdp_per_capita;
			break;
		case 'electricity':
			value = o.electricity_consumption_per_capita;
			break;
		case 'internet':
			value = o.internet_user_per_100;
			break;
		case 'phones':
			value = o.cell_phones_per_100;
			break;
		default:
			value = 0;
			break;
	}
	return parseFloat(value);
}


// Scene Configurations
let viewPortWidth = window.innerWidth;
let viewPortHeight = window.innerHeight;
console.log('View Port size: ' + viewPortWidth + 'x' + viewPortHeight);
let WIDTH = 1450;
let HEIGHT = viewPortHeight;
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
//renderer.setClearColor(0x707070);


// Light
var light = new THREE.PointLight(0xffffff, 0.7);
light.position.set(0, 0, 6);
scene.add(light);
var ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


// MapboxGL
//const key = 'pk.eyJ1IjoicmljYXJkb2xhbmduZXIiLCJhIjoiY2pxano2enh2MG1qazN4bm5lajIzeDl3eiJ9.wK0MtuxLgJxDcGUksKMeKgb';
const key = 'pk.eyJ1IjoicGlra3UiLCJhIjoiY2pwenloamxoMDl0djQybWxlY3hkaGVpZSJ9.MKRV1BETvooEv5r_dEaXTQ';
var options = {
    lat: 0,
    lng: 0,
    zoom: 4,
    pitch: 30
}
var mappa = new Mappa('MapboxGL', key);
var map = mappa.tileMap(options);
map.overlay(canvas);
//console.log(map.getPitch);



// Upate mesh position
map.onChange(update);
function update() {
	if (loaded) {
		meshes.forEach((mesh, item) => {
			const pos = map.latLngToPixel(parseFloat(json[item].gps_lat), parseFloat(json[item].gps_long));
			const vector = new THREE.Vector3();
			vector.set((pos.x / WIDTH) * 2 - 1, -(pos.y / HEIGHT) * 2 + 1, 0.5);
			vector.unproject(camera);
			const dir = vector.sub(camera.position).normalize();
			const distance = -camera.position.z / dir.z;
			const newPos = camera.position.clone().add(dir.multiplyScalar(distance));
			
			// calculate z-axis delta
			const value = getValue(json[item]);
			const ratio = value / highest_value;
			const bar_height = ratio * 50;
			const delta = (bar_height / 2) - 0.5;
			
			mesh.position.set(newPos.x, newPos.y, delta);
			
			
			const pitch = map.map.transform.pitch * -1;
			const tilt = ((2* Math.PI)/360) * pitch;
			mesh.rotation.x = tilt;
			/*
			const axis = new THREE.Vector3(1, 0, 0).normalize();
			const quaternion = new THREE.Quaternion();
			const current = mesh.rotation.x;
			console.log(current);
			const target = current + tilt;
			console.log(target);
			quaternion.setFromAxisAngle(axis, target);
			mesh.applyQuaternion(quaternion);
			console.log(mesh.rotation.x);
			*/
			
			
			const turn = - map.map.transform.angle;
			mesh.rotation.z = turn;
			
			
			scene.add(mesh);
			//renderer.render(scene, camera);
		})
	}
}

// Animate loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

//popup and closebutton

const modal = document.getElementById('popup');
const closeBtn = document.getElementsByClassName('close')[0];
closeBtn.addEventListener('click', closeModal);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}
//https://www.youtube.com/watch?v=6ophW7Ask_0

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

//add raycaster and mouse as 2D vector
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//add event listener for mouse and calls function when activated
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
      
function onDocumentMouseDown( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( meshes );
        
	var color = (Math.random() * 0xffffff);

	if ( intersects.length > 0 ) {
	// get Data for country
	data = intersects[0].object.name.split(';');
	name = data[0];
	value = Math.round( data[1] * 10) / 10;
	console.log(name, value);
	
	intersects[ 0 ].object.material.color.setHex( color );
            
	this.temp = intersects[ 0 ].object.material.color.getHexString();
	this.name = intersects[ 0 ].object.name;
            
			
			
	//modal.style.top = ;
	//modal.style.left = ;
	
	document.getElementById("text").innerHTML = "<p><strong>" + selected + "</strong> is <strong>" + value.toString() + "</strong> for <strong>" + name + "</strong></p>";
	openModal();
	}
} 		
//https://www.youtube.com/watch?v=ckcuQw2fDT4&
//https://codepen.io/wpdildine/pen/ZGyRVN/
//https://threejs.org/docs/#api/en/core/Raycaster

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------




animate();
