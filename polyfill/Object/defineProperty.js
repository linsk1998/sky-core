import { Object } from "../../native/Object/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { defineProperties } from "../../native/Object/defineProperties";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperty$ff } from "../../impl/object/accessor/defineProperty$ff";
import { defineProperty$ie8 } from "../../impl/object/accessor/defineProperty$ie8";
import { defineProperty$v8 } from "../../impl/object/accessor/defineProperty$v8";
import { defineProperty$es3 } from "../../impl/object/accessor/defineProperty$es3";

if(defineProperty) {
	if(!defineProperties) {
		Object.defineProperty = defineProperty$ie8;
	} else if(hasV8DefineBug) {
		Object.defineProperty = defineProperty$v8;
	}
} else {
	if(__defineSetter__) {
		Object.defineProperty = defineProperty$ff;
	} else {
		Object.defineProperty = defineProperty$es3;
	}
}
