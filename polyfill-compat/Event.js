
if(typeof Event !== "function") {
	if(document.createEventObject) {
		window.Event = function(evt, init) {
			var e = document.createEventObject();
			e.type = evt;
			if(init) {
				e.bubbles = init.bubbles;
				e.cancelable = init.cancelable;
			} else {
				e.bubbles = false;
				e.cancelable = false;
			}
			return e;
		};
	}
}