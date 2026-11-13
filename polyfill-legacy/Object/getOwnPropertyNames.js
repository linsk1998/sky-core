import { Object } from "../../native/Object";
import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { getOwnPropertyNames$es3 } from "../../impl/object/enum/getOwnPropertyNames$es3";
import { getOwnPropertyNames$fixSymbol } from "../../impl/object/enum/getOwnPropertyNames$fixSymbol";

if(!getOwnPropertyNames) {
	Object.getOwnPropertyNames = getOwnPropertyNames$es3;
} else if(!Symbol) {
	Object.getOwnPropertyNames = getOwnPropertyNames$fixSymbol;
}
