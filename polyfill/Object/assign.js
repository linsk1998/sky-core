import { Object } from "../../native/Object";
import { assign } from "../../impl/Object/assign";

if(!Object.assign) {
	Object.assign = assign;
}