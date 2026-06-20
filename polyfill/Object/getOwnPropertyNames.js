import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames$jscript } from "../../impl/object/enum/getOwnPropertyNames$jscript";
import { getOwnPropertyNames$ff } from "../../impl/object/enum/getOwnPropertyNames$ff";
import { getOwnPropertyNames$fixSymbol } from "../../impl/object/enum/getOwnPropertyNames$fixSymbol";

if(getOwnPropertyNames) {
	if(!Symbol) {
		Object.getOwnPropertyNames = getOwnPropertyNames$fixSymbol;
	}
} else {
	if(Object.prototype.__defineSetter__) {
		Object.getOwnPropertyNames = getOwnPropertyNames$ff;
	} else {
		Object.getOwnPropertyNames = getOwnPropertyNames$jscript;
	}
}
