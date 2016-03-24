"use strict";

const cols = document.querySelectorAll("#columns .column");
let dragSrcElement = null;

function handleDragStart(e) {
	console.log('dragstart triggered');
	e.target.style.opacity = "0.4";
	
	dragSrcElement = e.target;
	e.dataTransfer.effectAllowed = "move";
	e.dataTransfer.setData("text/html", e.target.innerHTML);
}
		
function handleDragEnter(e) {
	console.log('dragenter triggered');
	e.target.classList.add("over");
}
		
function handleDragOver(e) {
	console.log('dragover triggered');
	e.preventDefault();
	
	e.dataTransfer.dropEffect = "move";
	
	return false;
}
		
function handleDragLeave(e) {
	console.log('dragleave triggered');
	e.target.classList.remove("over");
}
		
function handleDrop(e) {
	console.log('drop triggered');
	e.stopPropagation();
	
	if (dragSrcElement != this) {
		dragSrcElement.innerHTML = this.innerHTML;
		dragSrcElement.style.opacity = "1.0";
		e.target.innerHTML = e.dataTransfer.getData("text/html");
	}
	
	return false;
}
		
function handleDragEnd(e) {
	[].forEach.call(cols, function(col) {
		col.classList.remove("over");
	});
}

[].forEach.call(cols, (col) => {
	col.addEventListener("dragstart", handleDragStart, false);
	col.addEventListener("dragenter", handleDragEnter, false);
	col.addEventListener("dragover", handleDragOver, false);
	col.addEventListener("dragleave", handleDragLeave, false);
	col.addEventListener("drop", handleDrop, false);
	col.addEventListener("dragend", handleDragEnd, false);
});

document.querySelector("#some_area").addEventListener("dragenter", (e) => {
	e.target.classList.add("over");
}, false);

document.querySelector("#some_area").addEventListener("drop", (e) => {
	e.stopPropagation();

	var data = e.dataTransfer.getData("text/html");
	e.target.innerHTML = data;
	
	return false;
}, false);

let ball = document.querySelector("#ball");
ball.onmousedown = (e) => {	
	const moveAt = (event) => {		
		ball.style.left = event.pageX - ball.offsetWidth / 2 + "px";
		ball.style.top = event.pageY - ball.offsetHeight / 2+ "px";
	};
	
	// prepare for dragging and position in the same place with absolute positioning.
	ball.style.position = "absolute";
	moveAt(e);
	// move to body in order the element was inside position relative
	document.body.appendChild(ball);
	
	ball.style.zIndex = 1000;
	
	// move element on the screen
	document.onmousemove = (evt) => moveAt(evt);
	
	// detect the end of movement (drop)
	ball.onmouseup = () => {
		document.onmousemove = null;
		ball.onmouseup = null;
	};
};

// disable default drag events
ball.ondragstart = () => false;

/*
var canvas = document.getElementById('canvas-container');
var context = canvas.getContext('2d');
var radius = 20;
var color = "#0000ff";
var g = 0.1; // acceleration due to gravity
var x = 50; // initial horizontal position
var y = 50; // initial vertical position
var vx = 2; // initial horizontal speed
var vy = 0; // initial vertical speed
window.onload = function init() {
	setInterval(onEachStep, 1000/60); // 60 fps
};
function onEachStep() {
	vy += g; // gravity increases the vertical speed
	x += vx; // horizontal speed increases horizontal position
	y += vy; // vertical speed increases vertical position
	if (y > canvas.height - radius){ // if ball hits the ground
		y = canvas.height - radius; // reposition it at the ground
		vy *= -0.8; // then reverse and reduce its vertical speed
	} 
	if (x > canvas.width + radius){ // if ball goes beyond canvas
		x = -radius; // wrap it around
	}
	drawBall(); // draw the ball
};
var drawBall = function () {
	this.clearRect(0, 0, canvas.width, canvas.height);
	this.fillStyle = color;
	this.beginPath();
	this.arc(x, y, radius, 0, 2*Math.PI, true);
	this.closePath();
	this.fill();
}.bind(context);*/