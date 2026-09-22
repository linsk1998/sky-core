import { getCookie as getCookie$impl } from "../impl/cookie/getCookie";

export function getCookie(name) {
	var value = getCookie$impl(name);
	if(value != null) return decodeURIComponent(value); return null;
};
