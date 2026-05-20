import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperties } from "../../native/Object/defineProperties";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { ff_defineProperty, v8_defineProperty } from "../../impl-modern/Object/defineProperty";
import { compat_defineProperty, ie8_defineProperty } from "../../impl-compat/Object/defineProperty";

export default defineProperty
	? (!defineProperties
		? ie8_defineProperty
		: hasV8DefineBug
			? v8_defineProperty
			: defineProperty)
	: (__defineSetter__
		? ff_defineProperty
		: compat_defineProperty);