import { Object } from "../../native/Object";
import { defineProperties as suport_defineProperties } from "../../native/Object/defineProperties";
import { defineProperties } from "../../impl/Object/defineProperties";

if(!suport_defineProperties) {
	if(Object.prototype.__defineSetter__) {
		Object.defineProperties = defineProperties;
	}
}