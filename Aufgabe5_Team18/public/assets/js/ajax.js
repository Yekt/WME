// data
var json;
let loaded = false;
let selected = '';
let highest_value = 0;

// meshes
let meshes = [];
var material = new THREE.MeshLambertMaterial({color: 0xffffff});

// scene, camera, canvas, renderer, light
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
	
	// Scene, camera, canvas, renderer, light
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
	
	//MapboxGL
	options = {
		lat: 0,
		lng: 0,
		zoom: 4,
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
	window.addEventListener( 'resize', onWindowResize, false );
}




// Update mesh data
function updateMeshes() {
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
	// calculate height and create mesh
	for(var i = 0; i < json.length; i++) {
		let value = getValue(json[i]);
		let ratio = value / highest_value;
		let bar = new THREE.BoxGeometry(10, 10, 50 * ratio);
		let mesh = new THREE.Mesh(bar, material);
		mesh.name = json[i].name + ';' + value + ';' + json[i].gps_lat + ';' + json[i].gps_long;		
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



// Listeners

// Upate mesh position
function update() {
	if (loaded) {
		meshes.forEach((mesh, item) => {
			newPos = getPixel(json[item].gps_lat, json[item].gps_long);
			
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
			/*const axis = new THREE.Vector3(1, 0, 0).normalize();
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
function getPixel(lat, long) {
	lat = parseFloat(lat);
	long = parseFloat(long);
	const pos = map.latLngToPixel(lat, long);
	const vector = new THREE.Vector3();
	vector.set((pos.x / WIDTH) * 2 - 1, -(pos.y / HEIGHT) * 2 + 1, 0.5);
	vector.unproject(camera);
	const dir = vector.sub(camera.position).normalize();
	const distance = -camera.position.z / dir.z;
	const newPos = camera.position.clone().add(dir.multiplyScalar(distance));
	return newPos;
}

//popup and closebutton
//https://www.youtube.com/watch?v=6ophW7Ask_0
function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// window resize
function onWindowResize() {
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// popup on mouse click
function onDocumentMouseDown( event ) {
	//https://codepen.io/wpdildine/pen/ZGyRVN/
	//https://threejs.org/docs/#api/en/core/Raycaster
	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( meshes );

	if ( intersects.length > 0 ) {
		// get Data for country
		var data = intersects[0].object.name.split(';');
		var name = data[0];
		var value = Math.round( data[1] * 10) / 10;
		console.log(name, value);
		var lat = data[2];
		var long = data[3];
		var newPos = getPixel(lat, long);
		var xcor = ((newPos.x +1)/2) * window.innerWidth;
		var ycor = ((newPos.y -1)/-2) * window.innerHeight;
				
		modal.style.top = newPos.x + "px";
		modal.style.left = newPos.y + "px";
		
		document.getElementById("text").innerHTML = "<p><strong>" + selected + "</strong> is <strong>" + value.toString() + "</strong> for <strong>" + name + "</strong></p>";
		openModal();
	}
} 		
