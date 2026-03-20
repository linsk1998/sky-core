import { CookieStore } from "../impl/CookieStore";

var cookieStore = window.cookieStore;
if(location.protocol === 'https:' && !cookieStore) {
	cookieStore = new CookieStore();
}
export default cookieStore;