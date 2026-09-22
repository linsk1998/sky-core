import { clearTimeout } from '../native/clearTimeout';

if(!window.cancelAnimationFrame) {
	window.cancelAnimationFrame = clearTimeout;
}