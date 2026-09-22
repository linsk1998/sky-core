export function Event$ie(type) {
	var init = arguments[1];
	var e = document.createEventObject();
	e.type = type;
	e.isTrusted = false;
	if(init) {
		e.bubbles = init.bubbles;
		e.cancelable = init.cancelable;
	} else {
		e.bubbles = false;
		e.cancelable = false;
	}
	return e;
};