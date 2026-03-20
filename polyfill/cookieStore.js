import { CookieStore } from "../impl/CookieStore";

if(location.protocol === 'https:' && !window.cookieStore) {
	window.cookieStore = new CookieStore();
}