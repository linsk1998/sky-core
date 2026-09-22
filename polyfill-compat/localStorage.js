import { LocalStorage } from "../impl/storage/LocalStorage";

if(!window.localStorage) {
	var ele = document.createElement("localStorage");
	if(ele.addBehavior) {
		ele.addBehavior("#default#userData");
		document.head.appendChild(ele);
		window.localStorage = new LocalStorage(ele);
	}
}