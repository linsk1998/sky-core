import { Object } from "../../native/Object/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperty$ie8 } from "../../impl/object/accessor/defineProperty$ie8";
import { defineProperty$es3 } from "../../impl/object/accessor/defineProperty$es3";

if(defineProperty) {
	Object.defineProperty = defineProperty$ie8;
} else {
	Object.defineProperty = defineProperty$es3;
}
