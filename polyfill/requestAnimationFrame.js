import { setTimeout } from '../native/setTimeout';

if(!window.requestAnimationFrame) {
	window.requestAnimationFrame = function(callback) {
		return setTimeout(function() {
			callback(Date.now());
		}, 1000 / 60);
	};
}