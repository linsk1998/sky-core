import { performance } from "../performance";

if(!performance.now) {
	var started = Date.now();
	performance.now = function() {
		return Date.now() - started;
	};
}