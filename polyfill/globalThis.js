import { globalThis } from "../native/globalThis";
if(!globalThis) {
	this.globalThis = this;
}