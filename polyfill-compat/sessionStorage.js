

import { getCookie } from "../utils/getCookie";
import { setCookie } from "../utils/setCookie";
if(!window.sessionStorage) {
	var ele = document.createElement("sessionStorage");
	if(ele.addBehavior) {
		ele.addBehavior("#default#userData");
		document.head.appendChild(ele);
		var sessionId = getCookie("storageId");
		if(!sessionId) {
			sessionId = Math.random().toString(16).replace("0.", "");
			setCookie("storageId", sessionId);
		}
		// TODO
		// ele.load(sessionId);
		// var expires = new Date();
		// expires.setDate(expires.getDate() + 7);
		// ele.expires = expires.toUTCString();
		// ele.save(sessionId);
		window.sessionStorage = {
			getItem: function(key) {
				ele.load(sessionId);
				return ele.getAttribute(key);
			},
			setItem: function(key, value) {
				ele.load(sessionId);
				ele.setAttribute(key, new String(value));
				ele.save(sessionId);
			},
			removeItem: function(key) {
				ele.load(sessionId);
				ele.removeAttribute(key);
				ele.save(sessionId);
			},
			sham: true
		};
	}
}