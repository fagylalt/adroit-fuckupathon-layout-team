const dvd = document.getElementById("dvd");
const speed = 2;
let x = 0;
let y = 0;
let dx = speed;
let dy = speed;

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

// Start animation
animate();
