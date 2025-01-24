
if(typeof window.Event !== "function") {
	if(document.createEvent) {
		window.Event = function(type, init) {
			var e = document.createEvent('Event');
			e.isTrusted = false;
			if(init) {
				e.initEvent(type, init.bubbles, init.cancelable);
			} else {
				e.initEvent(type, false, false);
			}
			return e;
		};
	}
}