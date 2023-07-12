

import { getCookie } from "../utils/getCookie";
import { setCookie } from "../utils/setCookie";
if(!window.sessionStorage) {
	var ele = document.createElement("sessionStorage");
	if(ele.addBehavior) {
		ele.addBehavior("#default#userData");
		document.head.appendChild(ele);
		var sessionId = getCookie("storageId");
		if(!sessionId) {
			sessionId = Date.now().toString(16);
			setCookie("storageId", sessionId);
		}
		window.sessionStorage = {
			getItem: function(key) {
				ele.load(sessionId);
				return ele.getAttribute(key);
			},
			setItem: function(key, value) {
				ele.setAttribute(key, new String(value));
				ele.expires = new Date(Date.now() + 864000000).toUTCString();
				ele.save(sessionId);
			},
			removeItem: function(key) {
				ele.removeAttribute(key);
				ele.expires = new Date(Date.now() + 864000000).toUTCString();
				ele.save(sessionId);
			},
			sham: true
		};
	}
}