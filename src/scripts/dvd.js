const dvd = document.getElementById("dvd");
const BASE_SPEED = 2;
const HOVER_MULTIPLIER = 3;

let speed = BASE_SPEED;
let x = 0;
let y = 0;
let dx = speed;
let dy = speed;

// Add hover events
dvd.addEventListener('mouseenter', () => {
	dx = dx > 0 ? BASE_SPEED * HOVER_MULTIPLIER : -BASE_SPEED * HOVER_MULTIPLIER;
	dy = dy > 0 ? BASE_SPEED * HOVER_MULTIPLIER : -BASE_SPEED * HOVER_MULTIPLIER;
});

dvd.addEventListener('mouseleave', () => {
	dx = dx > 0 ? BASE_SPEED : -BASE_SPEED;
	dy = dy > 0 ? BASE_SPEED : -BASE_SPEED;
});

function animate() {
	const maxX = window.innerWidth - dvd.offsetWidth;
	const maxY = window.innerHeight - dvd.offsetHeight;

	x += dx;
	y += dy;

	// Bounce off borders
	if (x <= 0 || x >= maxX) {
		dx = -dx;
		x = x <= 0 ? 0 : maxX;
	}
	if (y <= 0 || y >= maxY) {
		dy = -dy;
		y = y <= 0 ? 0 : maxY;
	}

	dvd.style.transform = `translate(${x}px, ${y}px)`;
	requestAnimationFrame(animate);
}

// Add fixed positioning to DVD element
dvd.style.position = 'fixed';
dvd.style.top = '0';
dvd.style.left = '0';
dvd.style.transition = 'transform 0.05s linear';

// Start animation
animate();
