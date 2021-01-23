
var ticks = null;
var nextTick = setTimeout;
export function initQueueMicrotask(fn) {
	nextTick = fn;
}
export function next() {
	if(ticks && ticks.length) {
		for(var i = 0; i < ticks.length; i++) {
			var args = ticks[i];
			var fn = args[0];
			args = Array.prototype.slice.call(args, 1);
			try {
				fn.apply(this, args);
			} catch(e) {
				console.error(e);
			}
		}
		ticks = null;
	}
}
export function queueMicrotask() {
	if(!ticks) {
		ticks = new Array();
		nextTick(next);
	}
	ticks.push(arguments);
};