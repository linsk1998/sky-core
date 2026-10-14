import { Object } from "../../native/Object";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { getOwnPropertyDescriptors$ie } from "../../impl/object/accessor/getOwnPropertyDescriptors$ie";
import { getOwnPropertyDescriptors$sb } from "../../impl/object/accessor/getOwnPropertyDescriptors$sb";

if(!Object.getOwnPropertyDescriptors) {
	if(getOwnPropertySymbols) {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$sb;
	} else {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$ie;
	}
}
