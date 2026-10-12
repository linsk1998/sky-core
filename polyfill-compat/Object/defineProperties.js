import { Object } from "../../native/Object";
import { defineProperties } from "../../native/Object/defineProperties";
import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperties$ie8 } from "../../impl/object/accessor/defineProperties$ie8";
import { defineProperties$es3 } from "../../impl/object/accessor/defineProperties$es3";

if(!defineProperties) {
	if(defineProperty) {
		Object.defineProperties = defineProperties$ie8;
	} else {
		Object.defineProperties = defineProperties$es3;
	}
}
