import { hasEnumBug } from "sky-core/utils/hasEnumBug";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames$jscript } from "../../impl/object/enum/getOwnPropertyNames$jscript";
import { getOwnPropertyNames$ff } from "../../impl/object/enum/getOwnPropertyNames$es3";
import { getOwnPropertyNames$fixSymbol } from "../../impl/object/enum/getOwnPropertyNames$fixSymbol";

if(getOwnPropertyNames) {
	if(!Symbol) {
		Object.getOwnPropertyNames = getOwnPropertyNames$fixSymbol;
	}
} else {
	if(hasEnumBug) {
		Object.getOwnPropertyNames = getOwnPropertyNames$jscript;
	} else {
		Object.getOwnPropertyNames = getOwnPropertyNames$ff;
	}
}
