// data
var json;
let loaded = false;
let selected = '';
let highest_value = 0;

// meshes
let meshes = [];
let material = new THREE.MeshLambertMaterial({color: 0xffffff});

// scene, camera, canvas, renderer, light - from mappa/threejs tutorial
let WIDTH, HEIGHT, ASPECT;
const VIEW_ANGLE = 45;
const NEAR = 0.1;
const FAR = 10000;
var scene, camera, canvas, renderer, light, ambient;

// MapboxGL
//const key = 'pk.eyJ1IjoicmljYXJkb2xhbmduZXIiLCJhIjoiY2pxano2enh2MG1qazN4bm5lajIzeDl3eiJ9.wK0MtuxLgJxDcGUksKMeKgb';
const key = 'pk.eyJ1IjoicGlra3UiLCJhIjoiY2pwenloamxoMDl0djQybWxlY3hkaGVpZSJ9.MKRV1BETvooEv5r_dEaXTQ';
var options, mappa, map;

// popup
const modal = document.getElementById('popup');
const closeBtn = document.getElementsByClassName('close')[0];

// raycaster
var raycaster, mouse;


init();

// Animate loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();



function init() {
	// get data
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/json',
		async: true,
		success: function(data) {
			json = JSON.parse(data)
			loaded = true;
			console.log(json);
			console.log('Json was successfully received from server!');
		}, error: function(jqXHR, text, err) {
			console.log('An error accured while trying to receive Json from server!');
			alert('There was an error trying to load the data.');
		}
	});
	
	// Scene, camera, canvas, renderer, light - from mappa/threejs tutorial
	WIDTH = window.innerWidth - 17;
	HEIGHT = window.innerHeight - 85;
	ASPECT = WIDTH / HEIGHT;
	console.log('View Port size: ' + WIDTH + 'x' + HEIGHT);
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	canvas = document.getElementById("mapa");
	renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas, antialias: true});
	camera.position.z = 300;
	scene.add(camera);
	renderer.setSize(WIDTH, HEIGHT);
	
	light = new THREE.PointLight(0xffffff, 0.7);
	light.position.set(0, 0, 6);
	ambient = new THREE.AmbientLight(0xffffff, 0.4);
	scene.add(light);
	scene.add(ambient);
	
	//MapboxGL - from mappa/threejs tutorial
	options = {
		lat: 45,
		lng: 10,
		zoom: 3,
		pitch: 30
	}
	mappa = new Mappa('MapboxGL', key);
	map = mappa.tileMap(options);
	map.overlay(canvas);
	
	// raycaster and mouse
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	
	// listeners
	map.onChange(update);
	closeBtn.addEventListener( 'click', closeModal);
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}




// Update mesh data
function updateMeshes() {
	closeModal();
	// https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
	var radio = document.getElementsByName('selection');
	for(var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			selected = radio[i].value;
			break;
		}
	}
	// find highest value
	highest_value = 0;
	for(var i = 0; i < json.length; i++) {
		let value = getValue(json[i]);
		if(value >= highest_value) highest_value = value;
	}		
	// change color
	switch(selected) {
		case 'Birth rate per 1000':
			material = new THREE.MeshLambertMaterial({color: 0xD03A3D});
			break;
		case 'Children per woman':
			material = new THREE.MeshLambertMaterial({color: 0x5DAC5A});
			break;
		case 'GDP per capita':
			material = new THREE.MeshLambertMaterial({color: 0x314CB0});
			break;
		case 'Electricity consumption per capita':
			material = new THREE.MeshLambertMaterial({color: 0xF8E62D});
			break;
		case 'Internet user per 100':
			material = new THREE.MeshLambertMaterial({color: 0x621B98});
			break;
		case 'Phones per 100':
			material = new THREE.MeshLambertMaterial({color: 0x58C6DC});
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
	// calculate height and create mesh
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
		case 'Birth rate per 1000':
			value = o.birth_rate_per_1000;
			break;
		case 'Children per woman':
			value = o.children_per_woman;
			break;
		case 'GDP per capita':
			value = o.gdp_per_capita;
			break;
		case 'Electricity consumption per capita':
			value = o.electricity_consumption_per_capita;
			break;
		case 'Internet user per 100':
			value = o.internet_user_per_100;
			break;
		case 'Phones per 100':
			value = o.cell_phones_per_100;
			break;
		default:
			value = 0;
			break;
	}
	return parseFloat(value);
}



// Listeners

// Upate mesh position - from mappa/threejs tutorial
function update() {
	closeModal();
	if (loaded) {
		meshes.forEach((mesh, item) => {
			const pos = map.latLngToPixel(json[item].gps_lat, json[item].gps_long);
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
			
			// respond to pitch
			const pitch = map.map.transform.pitch * -1;
			const tilt = ((2* Math.PI)/360) * pitch;
			mesh.rotation.x = tilt;
			/*const axis = new THREE.Vector3(1, 0, 0).normalize(); //test vector
			const quaternion = new THREE.Quaternion();
			const current = mesh.rotation.x;
			console.log(current);
			const target = current + tilt;
			console.log(target);
			quaternion.setFromAxisAngle(axis, target);
			mesh.applyQuaternion(quaternion);
			console.log(mesh.rotation.x);*/
			
			// respond to rotation
			const turn = - map.map.transform.angle;
			mesh.rotation.z = turn;
			
			scene.add(mesh);
		})
	}
}

// popup and closebutton
//https://www.youtube.com/watch?v=6ophW7Ask_0
//https://codepen.io/bradtraversy/pen/zEOrPp
function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// popup on mouse click
function onDocumentMouseDown( event ) {
	//https://codepen.io/wpdildine/pen/ZGyRVN/
	//https://threejs.org/docs/#api/en/core/Raycaster
	event.preventDefault();

	mouse.x = ( event.clientX / WIDTH ) * 2 - 1;
	mouse.y = - ( event.clientY / HEIGHT ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( meshes );

	if ( intersects.length > 0 ) {
		// get Data for country
		var data = intersects[0].object.name.split(';');
		var name = data[0];
		var value = Math.round( data[1] * 10) / 10;
		console.log(name, value);
				
		modal.style.top = (event.clientY - 120) + "px";
		modal.style.left = (event.clientX - 80) + "px";
		
		document.getElementById("text").innerHTML = "<p><strong>" + selected + "</strong><br> is <strong>" + value.toString() + "</strong><br> for <strong>" + name + "</strong></p>";
		openModal();
	}
} 		
