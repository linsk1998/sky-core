import { setTimeout as native_setTimeout } from "../native/setTimeout";

export function requestAnimationFrame(callback) {
	return native_setTimeout(function() {
		callback(Date.now());
	}, 1000 / 60);
}
