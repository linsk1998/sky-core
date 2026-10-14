import { defineProperties } from "../../native/Object/defineProperties";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperties$ff } from "../../impl/object/accessor/defineProperties$ff";
import { defineProperties$v8 } from "../../impl/object/accessor/defineProperties$v8";
import { defineProperties$es3 } from "../../impl/object/accessor/defineProperties$es3";

export default defineProperties
	? (hasV8DefineBug
		? defineProperties$v8
		: defineProperties)
	: (__defineSetter__
		? defineProperties$ff
		: defineProperties$es3);
