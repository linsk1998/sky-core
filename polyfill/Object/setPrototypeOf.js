import { hasEnumBug } from "../../utils/hasEnumBug";
import { setPrototypeOf$ff } from "../../impl/object/setPrototypeOf$ff";
import { setPrototypeOf$ie } from "../../impl/object/setPrototypeOf$ie";
import { setPrototypeOf$jscript } from "../../impl/object/setPrototypeOf$jscript";
import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
if(!setPrototypeOf) {
	if(Object.__proto__) {
		Object.setPrototypeOf = setPrototypeOf$ff;
	} else if(hasEnumBug) {
		Object.setPrototypeOf = setPrototypeOf$jscript;
	} else {
		Object.setPrototypeOf = setPrototypeOf$ie;
	}
}
