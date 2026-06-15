import { Object } from "../../native/Object/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperty$ff } from "../../impl/object/accessor/defineProperty$ff";
import { defineProperty$v8 } from "../../impl/object/accessor/defineProperty$v8";

if(defineProperty) {
	if(hasV8DefineBug) {
		Object.defineProperty = defineProperty$v8;
	}
} else {
	Object.defineProperty = defineProperty$ff;
}
