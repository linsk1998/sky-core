import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { hasEnumBug } from "../../utils/hasEnumBug";
import { proto } from "../../support/proto";
import { canProtoNull } from "../../impl/object/proto/canProtoNull";
import { getPrototypeOf$ff } from "../../impl/object/proto/getPrototypeOf$ff";
import { getPrototypeOf$o } from "../../impl/object/proto/getPrototypeOf$o";
import { getPrototypeOf$ie } from "../../impl/object/proto/getPrototypeOf$ie";
import { getPrototypeOf$es3 } from "../../impl/object/proto/getPrototypeOf$es3";
import { getPrototypeOf$jscript } from "../../impl/object/proto/getPrototypeOf$jscript";

if(!getPrototypeOf) {
	if(proto) {
		if(canProtoNull) {
			Object.getPrototypeOf = getPrototypeOf$ff;
		} else {
			Object.getPrototypeOf = getPrototypeOf$o;
		}
	} else if(hasEnumBug) {
		Object.getPrototypeOf = getPrototypeOf$jscript;
	} else {
		Object.getPrototypeOf = getPrototypeOf$es3;
	}
} else if(!setPrototypeOf) {
	Object.getPrototypeOf = getPrototypeOf$ie;
}
