
var ticks = null;
var nextTick = setTimeout;
export function initQueueMicrotask(fn) {
	nextTick = fn;
}
export function next() {
	if(ticks && ticks.length) {
		for(var i = 0; i < ticks.length; i++) {
			var fn = ticks[i];
			try {
				fn();
			} catch(e) {
				console.error(e);
			}
		}
		ticks = null;
	}
}
export function queueMicrotask(fn) {
	if(!ticks) {
		ticks = new Array();
		nextTick(next);
	}
	ticks.push(fn);
};