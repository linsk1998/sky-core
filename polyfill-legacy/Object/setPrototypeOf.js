import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
import { setPrototypeOf$ff } from "../../impl/object/setPrototypeOf$ff";

if(!setPrototypeOf) {
	Object.setPrototypeOf = setPrototypeOf$ff;
}
