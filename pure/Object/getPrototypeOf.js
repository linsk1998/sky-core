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

export default getPrototypeOf ? (
	setPrototypeOf ? getPrototypeOf : getPrototypeOf$ie
) : (
	proto ?
		(canProtoNull ? getPrototypeOf$ff : getPrototypeOf$o) :
		(hasEnumBug ? getPrototypeOf$jscript : getPrototypeOf$es3)
);
