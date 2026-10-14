import { Object } from "../../native/Object";
import { hasV8DefineBug } from "../../support/hasV8DefineBug";
import { defineProperties$v8 } from "../../impl/object/accessor/defineProperties$v8";

if(hasV8DefineBug) {
	Object.defineProperties = defineProperties$v8;
}
