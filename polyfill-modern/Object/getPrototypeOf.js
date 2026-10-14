import { getPrototypeOf$ie } from "../../impl/object/proto/getPrototypeOf$ie";
import { Object } from "../../native/Object";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
if(getPrototypeOf && !setPrototypeOf) {
	Object.getPrototypeOf = getPrototypeOf$ie;
}
