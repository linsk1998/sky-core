import { Object } from "../../native/Object";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames$es3 } from "../../impl/object/enum/getOwnPropertyNames$es3";
import { getOwnPropertyNames$fixSymbol } from "../../impl/object/enum/getOwnPropertyNames$fixSymbol";

if(getOwnPropertyNames) {
	if(!Symbol) {
		Object.getOwnPropertyNames = getOwnPropertyNames$fixSymbol;
	}
} else {
	Object.getOwnPropertyNames = getOwnPropertyNames$es3;
}
