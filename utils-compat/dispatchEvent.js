
export function dispatchEvent(ele, e) {
	var type = e.type;
	switch(type) {
		case 'load':
			if(ele.tagName == "SCRIPT") {
				e.polyfill = true;
				ele.fireEvent("onreadystatechange", e);
				return;
			}
			break;
		case 'wheel':
			type = 'mousewheel';
			break;
		case "DOMContentLoaded":
			if(ele === document) {
				e.polyfill = true;
				ele.fireEvent("onreadystatechange", e);
				return;
			}
			break;
		case 'input':
			e.propertyName = 'value';
			e.polyfill = true;
			ele.fireEvent("onpropertychange", e);
			return;
		default:
	}
	ele.fireEvent("on" + type, e);
}