import { Object } from "../../native/Object";
import { defineProperties } from "../../native/Object/defineProperties";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperties$ff } from "../../impl/object/accessor/defineProperties$ff";
import { fix_defineProperties } from "../../impl/object/accessor/fix_defineProperties";
import { defineProperties$v8 } from "../../impl/object/accessor/defineProperties$v8";

if(defineProperties) {
	if(hasV8DefineBug) {
		Object.defineProperties = defineProperties$v8;
	}
} else {
	Object.defineProperties = fix_defineProperties(defineProperties$ff);
}
