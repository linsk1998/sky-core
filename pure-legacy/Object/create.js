import { create } from "../../native/Object/create";
import { proto } from "../../support/proto";
import { accessor } from "../../support/accessor";
import { canProtoNull } from "../../impl/object/proto/canProtoNull";
import { create$ff } from "../../impl/object/proto/create$ff";
import { create$o } from "../../impl/object/proto/create$o";
import { create$es3 } from "../../impl/object/proto/create$es3";

var implementation = create || (
	proto ?
		(canProtoNull ? create$ff : create$o) :
		create$es3
);

if(!create && (!proto || !accessor)) {
	implementation.sham = true;
}

export default implementation;
