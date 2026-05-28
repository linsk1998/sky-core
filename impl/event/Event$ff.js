export function Event$ff(type, init) {
	var e = document.createEvent(type || 'Event');
	if(!('isTrusted' in e)) {
		e.isTrusted = false;
	}
	if(init) {
		e.initEvent(type, init.bubbles, init.cancelable);
	} else {
		e.initEvent(type, false, false);
	}
	return e;
}