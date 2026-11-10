import { create } from "../../native/Object/create";
import { proto } from "../../support/proto";
import { accessor } from "../../support/accessor";
import { canProtoNull } from "../../impl/object/proto/canProtoNull";
import { create$ff } from "../../impl/object/proto/create$ff";
import { create$o } from "../../impl/object/proto/create$o";
import { create$jscript } from "../../impl/object/proto/create$jscript";

var implementation = create || (
	proto ?
		(canProtoNull ? create$ff : create$o) :
		create$jscript
);

if(!create && (!proto || !accessor)) {
	implementation.sham = true;
}

export default implementation;
