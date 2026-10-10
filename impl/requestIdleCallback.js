export function requestIdleCallback(callback) {
	return setTimeout(function() {
		callback({
			timeRemaining: function() { return 0; },
			didTimeout: false
		});
	}, 0);
}
