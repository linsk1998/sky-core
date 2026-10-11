import { Object } from "../../native/Object";
import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames$fixSymbol } from "../../impl/object/enum/getOwnPropertyNames$fixSymbol";

if(!Symbol) {
	Object.getOwnPropertyNames = getOwnPropertyNames$fixSymbol;
}
