//canvas1 for moving elements (dots), canvas2 for fixed elements (trails)
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const omegaInput = document.getElementById('omega');
const deltaInput = document.getElementById('delta');
const rateInput = document.getElementById('rate');
const colorInput = document.getElementById('color');
const pi = Math.PI;
let iW = 1600;
let iH = iW;
canvas1.width = canvas1.height = canvas2.width = canvas2.height = iW;
let centerX = iW / 2;
let centerY = iH / 2;
let omega = pi/2;
let delta = pi;
let rate = 10;
let color = "#FFFFFF"

function point(x, y, xRate, yRate, xLine, yLine) {
	this.centerX = x;
	this.centerY = y;
	this.xLine = xLine;
	this.yLine = yLine; //bools for whether or not to draw the gray line
	this.xRate = xRate;
	this.yRate = yRate;
	this.o = omega;
	this.d = delta; //pull from global vars
	this.radius = 6;
	this.color = color;
	this.amp = iW / 20;
	this.x = this.amp * Math.sin(this.o) + this.centerX;
	this.y = this.amp * Math.sin(this.d) + this.centerY;

	this.update = function(){
		this.lastX = this.x;
		this.lastY = this.y;
		this.x = this.amp * Math.sin(this.o) + this.centerX;
		this.y = this.amp * Math.sin(this.d) + this.centerY;
		this.o += rate/(this.xRate * 100);
		this.d += rate/(this.yRate * 100);
		//draw the lines on canvas2
		ctx2.lineWidth = 1;
		ctx2.strokeStyle = color;
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
			yLine ? ctx1.moveTo(this.x, 0) : ctx1.moveTo(0, this.y);
			yLine ? ctx1.lineTo(this.x, iH) : ctx1.lineTo(iW, this.y);
			ctx1.stroke();
		}
	};
}

let points;
function init() {
	//clear old lines
	ctx2.clearRect(0, 0, iW, iH);
	//set color from jscolor input
	color = '#' + colorInput.value;
	//fill points array with 64 points
	points = [];
	for (let x = 0; x < 8; x++){
		for(let y = 0; y < 8; y++){
			points.push(new point(
				x * (iW / 8) + (iW / 16), //x position
				y * (iH / 8) + (iH / 16), //y position
				x + 1, //x rate
				y + 1, //y rate
				x === 0, //bool for xLine
				y === 0 //bool for yLine
			));
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

	omega = parseFloat(omegaInput.value * pi / 180);
	delta = parseFloat(deltaInput.value * pi / 180);
	rate = parseFloat(rateInput.value);
}

init();
animate();
