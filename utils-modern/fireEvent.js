var notCapture = ["load", "unload", "scroll", "resize", "blur", "focus", "mouseenter", "mouseleave", "input", "propertychange"];
export function fireEvent(ele, type, props) {
	var e = document.createEvent('Event');
	switch(type) {
		case "mouseenter":
			if(!('onmouseenter' in document)) {
				type = 'mouseover';
				e.polyfill = true;
			}
			break;
		case "mouseleave":
			if(!('onmouseleave' in document)) {
				type = 'mouseout';
				e.polyfill = true;
			}
			break;
	}
	var bubbles = notCapture.indexOf(type) < 0;
	var cancelable = true;
	if(props) {
		for(var key in props) {
			switch(key) {
				case 'bubbles':
					bubbles = props.bubbles;
					break;
				case 'cancelable':
					cancelable = props.cancelable;
					break;
				default:
					e[key] = props[key];
			}
		}
	}
	e.initEvent(type, bubbles, cancelable);
	return ele.dispatchEvent(e);
};