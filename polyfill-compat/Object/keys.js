import { Object } from "../../native/Object";
import { keys as keys$jscript } from "../../impl/object/enum/keys$jscript";

if(!Object.keys) {
	Object.keys = keys$jscript;
}
