import { Object } from "../../native/Object";
import { assign } from "../../impl/object/enum/assign";

if(!Object.assign) {
	Object.assign = assign;
}