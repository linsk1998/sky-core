import { parseCookie } from "./parseCookie";

export function getCookie(name) {
	var cookies = parseCookie(document.cookie);
	var len = cookies.length;
	for(var i = 0; i < len; i++) {
		var cookie = cookies[i];
		if(cookie.name === name) {
			return cookie.value;
		}
	}
	return null;
};