

import { getCookie } from "../utils/getCookie";
import { setCookie } from "../utils/setCookie";
if(!this.sessionStorage) {
	var ele = document.createElement("sessionStorage");
	if(ele.addBehavior) {
		ele.addBehavior("#default#userData");
		document.head.appendChild(ele);
		var sessionId = getCookie("JSESSIONID");
		if(!sessionId) {
			sessionId = Math.random().toString(16).replace("0.", "");
			setCookie("JSESSIONID", sessionId);
		}
		this.sessionStorage = {
			getItem: function(key) {
				ele.load(sessionId);
				return ele.getAttribute(key);
			},
			setItem: function(key, value) {
				ele.setAttribute(key, new String(value));
				ele.save(sessionId);
			},
			removeItem: function(key) {
				ele.removeAttribute(key);
				ele.save(sessionId);
			},
			sham: true
		};
	}
}