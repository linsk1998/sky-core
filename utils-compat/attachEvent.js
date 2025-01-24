import { Element } from "../native/Element";

export function attachEvent(ele, type, func) {
	switch(type) {
		case "load":
			if(ele.tagName === "SCRIPT") {
				type = 'readystatechange';
			}
			break;
		case "wheel":
			type = 'mousewheel';
			break;
		case "DOMContentLoaded":
			if(ele === document) {
				type = 'readystatechange';
				if(window === window.top) {
					checkDomReady();
				}
			}
			break;
		case "input":
			type = 'propertychange';
			break;
		case "mouseenter":
			if(!Element) {
				//IE低版本监视是否短时间内突然移出再进入
				ele.attachEvent('onmouseleave', func);
			}
			break;
	}
	ele.attachEvent('on' + type, func);
};


function checkDomReady() {
	try {
		document.documentElement.doScroll('left');
		document.readyState = "complete";
		ele.fireEvent("onreadystatechange");
	} catch(e) {
		setTimeout(arguments.callee, 0);
	}
}