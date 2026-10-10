import { Object } from "../../native/Object";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { proto } from "../../support/proto";
import { canProtoNull } from "../../impl/object/proto/canProtoNull";
import { getPrototypeOf$ff } from "../../impl/object/proto/getPrototypeOf$ff";
import { getPrototypeOf$o } from "../../impl/object/proto/getPrototypeOf$o";
import { getPrototypeOf$es3 } from "../../impl/object/proto/getPrototypeOf$es3";

if(!getPrototypeOf) {
	if(proto) {
		if(canProtoNull) {
			Object.getPrototypeOf = getPrototypeOf$ff;
		} else {
			Object.getPrototypeOf = getPrototypeOf$o;
		}
	} else {
		Object.getPrototypeOf = getPrototypeOf$es3;
	}
}
