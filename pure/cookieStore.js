import { CookieStore } from "../impl/cookie/CookieStore";

var cookieStore = window.cookieStore;
if(location.protocol === 'https:' && !cookieStore) {
	cookieStore = new CookieStore();
}
export default cookieStore;