import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperties } from "../../native/Object/defineProperties";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { ff_defineProperty, v8_defineProperty } from "../../impl-modern/Object/defineProperty";
import { compat_defineProperty, ie8_defineProperty } from "../../impl-compat/Object/defineProperty";

if(defineProperty) {
	if(!defineProperties) {
		Object.defineProperty = ie8_defineProperty;
	} else if(hasV8DefineBug) {
		Object.defineProperty = v8_defineProperty;
	}
} else {
	if(__defineSetter__) {
		Object.defineProperty = ff_defineProperty;
	} else {
		Object.defineProperty = compat_defineProperty;
	}
} 