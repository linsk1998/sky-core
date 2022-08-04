
if(typeof this.Event !== "function") {
	if(document.createEvent) {
		this.Event = function(evt, init) {
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