import { Element } from "../native/Element";

export function fixEvent(ele, type, e) {
	e = event;
	var target = e.target = e.srcElement;
	e.stopImmediatePropagation = stopImmediatePropagation;
	e.stopPropagation = stopPropagation;
	e.preventDefault = preventDefault;
	e.currentTarget = ele;
	switch(type) {
		case 'load':
			if(target.tagName === 'SCRIPT') {
				if(target.readyState === 'complete' || e.polyfill) {
					return e;
				}
			}
			break;
		case "DOMContentLoaded":
			if(ele === document) {
				if(document.readyState === "complete" || e.polyfill) {
					return e;
				}
			}
			break;
		case 'input':
			if(e.propertyName === 'value') {
				if(!target.disabled && !target.readOnly || e.polyfill) {
					return e;
				}
			}
			break;
		case 'mouseenter':
			if(type === e.type) {
				if(e.polyfill) {
					return e;
				}
				e.relatedTarget = e.fromElement;
				if(!Element) {
					//IE低版本需要判断是否短时间内突然移出再进入
					if(Date.now() - 150 < target.lastMouseLeave) {
						//间隔时间过短，排除
						break;
					}
				}
				return e;
			} else {
				//mouseleave
				target.lastMouseLeave = Date.now();
				break;
			}
		case 'mouseleave':
			if(e.polyfill) {
				return e;
			}
			if(Element) {
				e.relatedTarget = e.toElement;
				return e;
			}
			//IE低版本需要延迟运行
			triggerMouseLeave(target, e);
			break;
		default:
			if(!e.polyfill) return e;
	}
	throw new Error();
};

function stopImmediatePropagation() {
	this._pis = true; // propagationImmediateStopped
	this.cancelBubble = true;
}
function stopPropagation() {
	this.cancelBubble = true;
}
function preventDefault() {
	if(this.cancelable !== false) {
		this.defaultPrevented = true;
		this.returnValue = false;
	}
}
function triggerMouseLeave(ele, e) {
	var event = document.createEventObject();
	event.polyfill = true;
	event.type = e.type;
	event.relatedTarget = e.toElement;
	event.currentTarget = e.currentTarget;
	event.target = e.target;
	event.clientX = e.clientX;
	event.clientY = e.clientY;
	event.offsetX = e.offsetX;
	event.offsetY = e.offsetY;
	event.x = e.x;
	event.y = e.y;
	event.stopPropagation = stopPropagation;
	event.preventDefault = preventDefault;
	var t = setTimeout(function() {
		ele.fireEvent("onmouseleave", event);
		ele.detachEvent('onmouseenter', onenter);
		ele.lastMouseLeave = 0;
	}, 50);
	var onenter = function() {
		clearTimeout(t);
	};
	ele.attachEvent('onmouseenter', onenter);
}