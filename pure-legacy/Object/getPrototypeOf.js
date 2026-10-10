import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { proto } from "../../support/proto";
import { canProtoNull } from "../../impl/object/proto/canProtoNull";
import { getPrototypeOf$ff } from "../../impl/object/proto/getPrototypeOf$ff";
import { getPrototypeOf$o } from "../../impl/object/proto/getPrototypeOf$o";
import { getPrototypeOf$es3 } from "../../impl/object/proto/getPrototypeOf$es3";

export default getPrototypeOf || (
	proto ?
		(canProtoNull ? getPrototypeOf$ff : getPrototypeOf$o) :
		getPrototypeOf$es3
);
