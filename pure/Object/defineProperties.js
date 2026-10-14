import { defineProperties } from "../../native/Object/defineProperties";
import { defineProperty } from "../../native/Object/defineProperty";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperties$ff } from "../../impl/object/accessor/defineProperties$ff";
import { defineProperties$ie8 } from "../../impl/object/accessor/defineProperties$ie8";
import { defineProperties$v8 } from "../../impl/object/accessor/defineProperties$v8";
import { defineProperties$es3 } from "../../impl/object/accessor/defineProperties$es3";

export default defineProperties
	? (hasV8DefineBug
		? defineProperties$v8
		: defineProperties)
	: (defineProperty
		? defineProperties$ie8
		: (__defineSetter__
			? defineProperties$ff
			: defineProperties$es3));
