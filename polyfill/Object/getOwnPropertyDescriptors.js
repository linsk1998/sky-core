import { Object } from "../../native/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { getOwnPropertyDescriptors$ff } from "../../impl/object/accessor/getOwnPropertyDescriptors$ff";
import { getOwnPropertyDescriptors$ie } from "../../impl/object/accessor/getOwnPropertyDescriptors$ie";
import { getOwnPropertyDescriptors$sb } from "../../impl/object/accessor/getOwnPropertyDescriptors$sb";
import { getOwnPropertyDescriptors$es3 } from "../../impl/object/accessor/getOwnPropertyDescriptors$es3";

if(!Object.getOwnPropertyDescriptors) {
	if(defineProperty) {
		if(getOwnPropertySymbols) {
			Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$sb;
		} else {
			Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$ie;
		}
	} else if(__defineSetter__) {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$ff;
	} else {
		Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$es3;
	}
}
