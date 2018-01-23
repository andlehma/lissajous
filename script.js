//canvas1 for moving elements (dots), canvas2 for fixed elements (trails)
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const omegaInput = document.getElementById('omega');
const deltaInput = document.getElementById('delta');
const pi = Math.PI;
let iW = iH = 1600;
canvas1.width = canvas1.height = canvas2.width = canvas2.height = iW;
let centerX = iW / 2;
let centerY = iH / 2;
let omega = pi/2;
let delta = pi;

function point(x, y, xRate, yRate, xLine, yLine) {
	this.centerX = x;
	this.centerY = y;
	this.xLine = xLine;
	this.yLine = yLine; //bools for whether or not to draw the gray line
	this.xRate = xRate;
	this.yRate = yRate;
	this.o = omega;
	this.d = delta; //pull from global vars
	this.radius = 4;
	this.color = "#FFFFFF";
	this.amp = iW / 20;
	this.rateAmp = 10;
	this.x = this.amp * Math.sin(this.o) + this.centerX;
	this.y = this.amp * Math.sin(this.d) + this.centerY;

	this.update = function(){
		//draw the lines on canvas2
		this.lastX = this.x;
		this.lastY = this.y;
		this.x = this.amp * Math.sin(this.o) + this.centerX;
		this.y = this.amp * Math.sin(this.d) + this.centerY;
		this.o += 1/(this.xRate * this.rateAmp);;
		this.d += 1/(this.yRate * this.rateAmp);;
		ctx2.lineWidth = 1;
		ctx2.strokeStyle = "#FFFFFF";
		ctx2.moveTo(this.lastX, this.lastY);
		ctx2.lineTo(this.x, this.y);
		ctx2.stroke();
		this.draw();
	};

	this.draw = function(){
		//draw the dots on canvas1
		ctx1.beginPath();
		ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx1.fillStyle = this.color;
		ctx1.fill();
		ctx1.closePath();

		//gray lines only on first row & first column
		if (this.yLine || this.xLine){
			ctx1.strokeStyle = "#808080";
			ctx1.beginPath();
			yLine ?
				ctx1.moveTo(this.x, 0)
				: ctx1.moveTo(0, this.y);
			yLine ?
				ctx1.lineTo(this.x, iH)
				: ctx1.lineTo(iW, this.y);
			ctx1.stroke();
		}
	};
}

let points;
function init() {
	//clear old lines
	ctx2.clearRect(0, 0, iW, iH);
	//fill points array with 64 point
	points = [];
	for (let x = 0; x < 8; x++){
		for(let y = 0; y < 8; y++){
			points.push(new point(x * (iW / 8) + (iW / 16), y * (iH / 8) + (iH / 16), x + 1, y + 1, x == 0, y == 0));
		}
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx1.clearRect(0, 0, iW, iH); //only clear canvas1

	ctx2.beginPath(); //ouside the loop for performance reasons
	points.forEach(point => {
		point.update();
	});

	omega = parseFloat(omegaInput.value);
	delta = parseFloat(deltaInput.value);
}

init();
animate();
