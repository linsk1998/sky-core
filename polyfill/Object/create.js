import { Object } from "../../native/Object";
import { create } from "../../native/Object/create";
import { proto } from "../../support/proto";
import { canProtoNull } from "../../impl/object/proto/canProtoNull";
import { create$ff } from "../../impl/object/proto/create$ff";
import { create$o } from "../../impl/object/proto/create$o";
import { create$jscript } from "../../impl/object/proto/create$jscript";

if(!create) {
	if(proto) {
		if(canProtoNull) {
			Object.create = create$ff;
		} else {
			Object.create = create$o;
		}
	} else {
		Object.create = create$jscript;
	}
}
