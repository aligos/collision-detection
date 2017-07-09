require("../devServer.js");
require("./style.scss");

if (module.hot) {
	module.hot.accept();
}

// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

const colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];


// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;

	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function getDistance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Objects
function Circle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}


// Implementation
let circle1;
let circle2;
function init() {
	circle1 = new Circle(canvas.width / 2, canvas.height / 2, 60, 'black');
	circle2 = new Circle(10, 10, 10, 'yellow');
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);
	circle1.update();
	circle2.x = mouse.x;
	circle2.y = mouse.y;
	circle2.update();
	if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
		circle1.color = 'white';
	} else {
		circle1.color = 'black';
	}
}

init();
animate();