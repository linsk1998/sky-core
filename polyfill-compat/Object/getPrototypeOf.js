import { Object } from "../../native/Object";
import { getPrototypeOf$jscript } from "../../impl/object/proto/getPrototypeOf$jscript";
if(!Object.getPrototypeOf) {
	Object.getPrototypeOf = getPrototypeOf$jscript;
}
