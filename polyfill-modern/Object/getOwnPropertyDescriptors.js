import { Object } from "../../native/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { getOwnPropertyDescriptors$ff, getOwnPropertyDescriptors$ie, getOwnPropertyDescriptors$sb } from "../../impl-modern/Object/getOwnPropertyDescriptors";
if(!Object.getOwnPropertyDescriptors) {
	if(defineProperty) {
		if(getOwnPropertySymbols) {
			Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$sb;
		} else {
			Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$ie;
		}
	} else if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$ff;
	}
}