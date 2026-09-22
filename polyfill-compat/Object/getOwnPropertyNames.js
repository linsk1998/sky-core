import { Object } from "../../native/Object";
import { getOwnPropertyNames$jscript } from "../../impl/object/enum/getOwnPropertyNames$jscript";
if(!Object.getOwnPropertyNames) {
	Object.getOwnPropertyNames = getOwnPropertyNames$jscript;
}
