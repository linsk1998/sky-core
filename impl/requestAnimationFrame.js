export function requestAnimationFrame(callback) {
	return setTimeout(function() {
		callback(Date.now());
	}, 1000 / 60);
}
