function EventTarget() {
	this.listeners = {};
}
EventTarget.prototype.addEventListener = function(type, listenerObject, options) {
	var listeners = this.listeners;
	if(!(type in listeners)) {
		this.listeners[type] = [];
	}
	var handleEvent = typeof listenerObject === "object" ? listenerObject.handleEvent : listenerObject;
	var once, passive, signal, capture = false;
	if(options) {
		if(typeof options === "object") {
			capture = !!options.capture;
			passive = !!options.passive;
			once = options.once;
			signal = options.signal;
			if(signal) {
				signal.addEventListener('abort', function() {
					var i = listeners.length;
					while(i--) {
						var listener = listeners[i];
						if(listener.handleEvent === handleEvent) {
							listener.splice(i, 1);
						}
					}
				});
			}
		} else {
			capture = true;
		}
	}
	var i = listeners.length;
	while(i--) {
		var listener = listeners[i];
		if(listener.handleEvent === handleEvent) {
			return;
		}
	}
	this.listeners[type].push({
		handleEvent: handleEvent,
		once: once, passive: passive,
		signal: signal,
		capture: capture
	});
};
EventTarget.prototype.removeEventListener = function(type, listenerObject) {
	if(!(type in this.listeners)) {
		return;
	}
	var listeners = this.listeners[type];
	var handleEvent = typeof listenerObject === "object" ? listenerObject.handleEvent : listenerObject;
	var i = listeners.length;
	while(i--) {
		var listener = listeners[i];
		if(listener.handleEvent === handleEvent) {
			listeners.splice(i, 1);
		}
	}
};
EventTarget.prototype.dispatchEvent = function(event) {
	var type = event.type;
	if(!(type in this.listeners)) {
		return;
	}
	var listeners = this.listeners[type];
	var l = listeners.length;
	for(var i = 0; i < l; i++) {
		var listener = listeners[i];
		var handleEvent = listener.handleEvent;
		try {
			handleEvent.call(this, event);
		} catch(e) {
			console.error(e);
		}
		if(listener.once) {
			this.removeEventListener(type, handleEvent);
		}
	}
	return !event.defaultPrevented;
};
export { EventTarget };