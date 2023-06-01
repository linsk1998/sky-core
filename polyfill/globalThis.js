import { globalThis } from "../native/globalThis";
if(!globalThis) {
	window.globalThis = this;
}