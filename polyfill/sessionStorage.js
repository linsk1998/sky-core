import { SessionStorage } from "../impl/storage/SessionStorage";
import { Storage } from "../impl/storage/Storage";
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
		window.sessionStorage = new SessionStorage(ele, sessionId);
	} else {
		window.sessionStorage = new Storage();
	}
}