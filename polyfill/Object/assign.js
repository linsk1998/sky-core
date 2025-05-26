import { Object } from "../../native/Object";
import { Symbol } from "../../native/Symbol";
import { assign } from "../../impl/Object/assign";

if(!Symbol || !Object.assign) {
	Object.assign = assign;
}