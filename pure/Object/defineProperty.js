import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperties } from "../../native/Object/defineProperties";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperty$ff } from "../../impl/object/accessor/defineProperty$ff";
import { defineProperty$ie8 } from "../../impl/object/accessor/defineProperty$ie8";
import { defineProperty$v8 } from "../../impl/object/accessor/defineProperty$v8";
import { defineProperty$es3 } from "../../impl/object/accessor/defineProperty$es3";

export default defineProperty
	? (!defineProperties
		? defineProperty$ie8
		: hasV8DefineBug
			? defineProperty$v8
			: defineProperty)
	: (__defineSetter__
		? defineProperty$ff
		: defineProperty$es3);