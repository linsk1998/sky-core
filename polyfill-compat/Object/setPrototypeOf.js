import { Object } from "../../native/Object";
import { proto } from "../../support/proto";
import { setPrototypeOf$jscript } from "../../impl/object/proto/setPrototypeOf$jscript";
if(!proto) {
	Object.setPrototypeOf = setPrototypeOf$jscript;
}
