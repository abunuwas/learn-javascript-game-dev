var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var color = '#0095DD'

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
};

function draw() {
	// drawing code
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
		dy = -dy
		color = 'black';
	}
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
		color = 'red';
	}

	y += dy;
	x += dx;
};

setInterval(draw, 10);