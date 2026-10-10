import { create } from "../../native/Object/create";
import { proto } from "../../support/proto";
import { canProtoNull } from "../../impl/object/proto/canProtoNull";
import { create$ff } from "../../impl/object/proto/create$ff";
import { create$o } from "../../impl/object/proto/create$o";
import { create$es3 } from "../../impl/object/proto/create$es3";

export default create || (
	proto ?
		(canProtoNull ? create$ff : create$o) :
		create$es3
);
