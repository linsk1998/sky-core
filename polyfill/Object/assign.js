import { Object } from "../../native/Object";
import { Symbol } from "../../native/Symbol";
import { assign } from "../../impl/object/enum/assign";

if(!Symbol || !Object.assign) {
	Object.assign = assign;
}