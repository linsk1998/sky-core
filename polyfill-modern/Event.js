
if(typeof window.Event !== "function") {
	if(document.createEvent) {
		window.Event = function(evt, init) {
			var e = document.createEvent('Event');
			if(init) {
				e.initEvent(evt, init.bubbles, init.cancelable);
			} else {
				e.initEvent(evt, false, false);
			}
			return e;
		};
	}
}