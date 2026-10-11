import { Object } from "../../native/Object";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames$jscript } from "../../impl/object/enum/getOwnPropertyNames$jscript";
import { getOwnPropertyNames$es3 } from "../../impl/object/enum/getOwnPropertyNames$es3";
import { getOwnPropertyNames$fixSymbol } from "../../impl/object/enum/getOwnPropertyNames$fixSymbol";
import { hasEnumBug } from "../../utils/hasEnumBug";

if(!getOwnPropertyNames) {
	if(hasEnumBug) {
		Object.getOwnPropertyNames = getOwnPropertyNames$jscript;
	} else {
		Object.getOwnPropertyNames = getOwnPropertyNames$es3;
	}
} else if(!Symbol) {
	Object.getOwnPropertyNames = getOwnPropertyNames$fixSymbol;
}
