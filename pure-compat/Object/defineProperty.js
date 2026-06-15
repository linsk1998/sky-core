import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperty$ie8 } from "../../impl/object/accessor/defineProperty$ie8";
import { defineProperty$es3 } from "../../impl/object/accessor/defineProperty$es3";

export default defineProperty
	? defineProperty$ie8
	: defineProperty$es3;