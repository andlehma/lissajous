const canvas3 = document.getElementById('single1');
const canvas4 = document.getElementById('single2');
const ctx3 = canvas3.getContext('2d');
const ctx4 = canvas4.getContext('2d');
const omegaInput = document.getElementById('omega');
const deltaInput = document.getElementById('delta');
canvas3.width = canvas4.width = canvas3.height = canvas4.height = 200;
let centerX2 = canvas3.width / 2;
let centerY2 = canvas3.height / 2;
let dot;
let omega2 = 7;
let delta2 = 5;

function init2(){
	ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
	omega2 = parseInt(omegaInput.value);
	delta2 = parseInt(deltaInput.value);
	dot = new point(centerX2, centerY2, omega2, delta2, false, false);
	dot.ctx1 = ctx3;
	dot.ctx2 = ctx4;
	dot.amp = 80;
	dot.radius = 3;
}

function animate2(){
	requestAnimationFrame(animate2);
	ctx3.clearRect(0, 0, canvas3.width, canvas3.height); //only clear canvas3

	ctx4.lineWidth = .9;
	ctx4.beginPath();
	dot.update();
}

init2();
animate2();
