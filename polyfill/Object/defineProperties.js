import { Object } from "../../native/Object";
import { defineProperties } from "../../native/Object/defineProperties";
import { defineProperty } from "../../native/Object/defineProperty";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperties$ff } from "../../impl/object/accessor/defineProperties$ff";
import { defineProperties$ie8 } from "../../impl/object/accessor/defineProperties$ie8";
import { defineProperties$v8 } from "../../impl/object/accessor/defineProperties$v8";
import { defineProperties$es3 } from "../../impl/object/accessor/defineProperties$es3";

if(defineProperties) {
	if(hasV8DefineBug) {
		Object.defineProperties = defineProperties$v8;
	}
} else {
	if(defineProperty) {
		Object.defineProperties = defineProperties$ie8;
	} else if(__defineSetter__) {
		Object.defineProperties = defineProperties$ff;
	} else {
		Object.defineProperties = defineProperties$es3;
	}
}
