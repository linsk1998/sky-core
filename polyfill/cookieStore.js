import { CookieStore } from "../impl/cookie/CookieStore";

if(location.protocol === 'https:' && !window.cookieStore) {
	window.cookieStore = new CookieStore();
}