import { Object } from "../../native/Object";
import { proto } from "../../support/proto";
import { setPrototypeOf$jscript } from "../../impl/object/setPrototypeOf$jscript";
if(!proto) {
	Object.setPrototypeOf = setPrototypeOf$jscript;
}
