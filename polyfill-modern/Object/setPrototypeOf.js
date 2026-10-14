import { setPrototypeOf$ie } from "../../impl/object/proto/setPrototypeOf$ie";
import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
if(!setPrototypeOf) {
	Object.setPrototypeOf = setPrototypeOf$ie;
}
