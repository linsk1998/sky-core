export function any(iterable) {
	var arr = Array.from(iterable);
	var len = arr.length;
	var controller = new AbortController();
	function abort() {
		controller.abort(this.reason);
		clean();
	}
	function clean() {
		for(var i = 0; i < len; i++) {
			var signal = arr[i];
			signal.removeEventListener('abort', abort);
		}
	}
	for(var i = 0; i < len; i++) {
		var signal = arr[i];
		if(signal.aborted) {
			controller.abort(signal.reason);
			while(i--) {
				signal = arr[i];
				signal.removeEventListener('abort', abort);
			}
			break;
		} else signal.addEventListener('abort', abort);
	}
	return controller.signal;
}