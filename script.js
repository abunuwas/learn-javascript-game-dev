'use strict';

// Canvas variables
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Ball variables 
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var color = '#0095DD';

// Paddle variables 
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;

// Keyboard variables 
var rightPressed = false;
var leftPressed = false;

// Bricks variables
var brickRowCount = 3;
var brickColumnCount = 8;
var brickWidth = 100;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 40;
var brickOffsetLeft = 57;

var bricks = [];
for(var c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for(var r=0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0 };
	};
};

// Register keyboard event listeners
document.addEventListener(
						  'keydown', 
						   keyDownHandler, 
					   	   false);
document.addEventListener(
						  'keyup', 
						  keyUpHandler, 
						  false);

// Functions 
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	};
};

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	};
};

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
};

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(
		paddleX, 
		canvas.height-paddleHeight, 
		paddleWidth, 
		paddleHeight
		);
	ctx.fillStyle = '#0995DD';
	ctx.fill();
	ctx.closePath();
};

function drawBricks() {
	for(c=0; c < brickColumnCount; c++) {
		for(r=0; r < brickRowCount; r++) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = '#0095DD';
			ctx.fill();
			ctx.closePath();
		};
	};
}

function draw() {
	// drawing code
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	if(y + dy < ballRadius) {
		dy = -dy
		color = 'black';
	}
	else if(y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else {
			alert('GAME OVER');
			document.location.reload()	
		};		
	};
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
		color = 'red';
	};

	y += dy;
	x += dx;

	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	};
};

setInterval(draw, 10);
