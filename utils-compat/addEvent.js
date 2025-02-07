import { isNotNullObject } from "../utils/isNotNullObject";
import { notCapture } from "../impl/Event";
import { attachEvent } from "./attachEvent";
import { fixEvent } from "./fixEvent";

export function addEvent(el, type, cb, options) {
	var bubble;
	if(isNotNullObject(options)) {
		bubble = !options.capture;
	} else {
		bubble = !options;
	}
	var listeners = el.__listeners;
	var i, listener;
	if(listeners) {
		i = listeners.length;
		while(i--) {
			listener = listeners[i];
			if(listener[1] === type && listener[2] === cb && listener[3] === bubble) {
				return;
			}
		}
	} else {
		listeners = el.__listeners = [];
	}

	function func(e) {
		e = e || event;
		if(e.eventPhase) return;
		e.timeStamp = Date.now();
		e.bubbles = notCapture.indexOf(type) < 0;
		try {
			e = fixEvent(el, type, e);
		} catch(err) {
			return;
		}
		e.eventPhase = 1;
		var paths = [];
		var node = e.target;
		do {
			paths.push(node);
			node = node.parentNode;
		} while(node);
		var i, j, ilen, jlen;
		var listeners, listener;
		i = paths.length;
		while(i--) {
			if(i === 0) {
				e.eventPhase = 2;
			}
			node = paths[i];
			e.currentTarget = node;
			listeners = node.__listeners;
			if(listeners) {
				jlen = listeners.length;
				for(j = 0; j < jlen; j++) {
					listener = listeners[j];
					if(listener[1] === type && !listener[3]) {
						listener[2].call(node, e);
					}
					if(e._pis) {
						break;
					}
				}
				if(e.cancelBubble) {
					break;
				}
			}
		}
		ilen = paths.length;
		for(i = 0; i < ilen; i++) {
			if(i !== 0) {
				e.eventPhase = 3;
			}
			node = paths[i];
			e.currentTarget = node;
			listeners = node.__listeners;
			if(listeners) {
				jlen = listeners.length;
				for(j = 0; j < jlen; j++) {
					listener = listeners[j];
					if(listener[1] === type && listener[3]) {
						listener[2].call(node, e);
					}
					if(e._pis) {
						break;
					}
				}
				if(e.cancelBubble) {
					break;
				}
			}
		}
	}

	listeners.push([func, type, cb, bubble]);
	attachEvent(el, type, func);
}
