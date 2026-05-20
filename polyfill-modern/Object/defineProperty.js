import { defineProperty } from "../../native/Object/defineProperty";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { ff_defineProperty, v8_defineProperty } from "../../impl-modern/Object/defineProperty";

if(defineProperty) {
	if(hasV8DefineBug) {
		Object.defineProperty = v8_defineProperty;
	}
} else {
	Object.defineProperty = ff_defineProperty;
}