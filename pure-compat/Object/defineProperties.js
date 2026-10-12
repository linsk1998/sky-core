import { defineProperties } from "../../native/Object/defineProperties";
import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperties$ie8 } from "../../impl/object/accessor/defineProperties$ie8";
import { defineProperties$es3 } from "../../impl/object/accessor/defineProperties$es3";

export default defineProperties
	? defineProperties
	: (defineProperty
		? defineProperties$ie8
		: defineProperties$es3);
