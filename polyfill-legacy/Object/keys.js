import { keys } from "../../native/Object/keys";
import { keys$es3 } from "../../impl/object/enum/keys$es3";

if(!keys) {
	Object.keys = keys$es3;
}
