const dvd = document.getElementById("dvd");
const back = document.getElementById("back");
const BASE_SPEED = 2;
const HOVER_MULTIPLIER = 3;
const SHRINK_FACTOR = 0.9;

let speed = BASE_SPEED;
let x = window.innerWidth - dvd.offsetWidth;
let y = 0;
let dx = speed;
let dy = speed;
let hasStartedBouncing = false;
let currentScale = 1;

// Add hover events
dvd.addEventListener('mouseenter', () => {
	if (!hasStartedBouncing) {
		x = 0;
		y = window.innerHeight - dvd.offsetHeight;
		hasStartedBouncing = true;
	}

	dx = dx > 0 ? BASE_SPEED * HOVER_MULTIPLIER : -BASE_SPEED * HOVER_MULTIPLIER;
	dy = dy > 0 ? BASE_SPEED * HOVER_MULTIPLIER : -BASE_SPEED * HOVER_MULTIPLIER;
});

dvd.addEventListener('mouseleave', () => {
	dx = dx > 0 ? BASE_SPEED : -BASE_SPEED;
	dy = dy > 0 ? BASE_SPEED : -BASE_SPEED;
});

// Handle button clicks inside DVD
dvd.addEventListener('click', (e) => {
	if (e.target.tagName.toLowerCase() === 'button') {
		dvd.remove();
		back.remove();
	}
});

// Add secret keybind
document.addEventListener('keydown', (e) => {
	if (e.ctrlKey && e.code === 'Space') {
		e.preventDefault(); // Prevent default space behavior
		dvd.remove();
		back.remove();
	}
});

// Add click event on background
back.addEventListener('click', () => {
	if (hasStartedBouncing) {
		currentScale *= SHRINK_FACTOR;
		dvd.style.transform = `translate(${x}px, ${y}px) scale(${currentScale})`;
	}
});

function animate() {
	if (!hasStartedBouncing) {
		dvd.style.transform = `translate(${x}px, ${y}px) scale(${currentScale})`;
		requestAnimationFrame(animate);
		return;
	}

	const maxX = window.innerWidth - (dvd.offsetWidth * currentScale);
	const maxY = window.innerHeight - (dvd.offsetHeight * currentScale);

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

	dvd.style.transform = `translate(${x}px, ${y}px) scale(${currentScale})`;
	requestAnimationFrame(animate);
}

// Add fixed positioning to DVD element
dvd.style.position = 'fixed';
dvd.style.top = '0';
dvd.style.left = '0';
dvd.style.transition = 'transform 0.05s linear';

// Start animation
animate();
