import { defineProperties } from "../native/Object/defineProperties";
import { defineProperty } from "../native/Object/defineProperty";

export var hasV8DefineBug = !defineProperties;

if(!hasV8DefineBug) {
	defineProperty(
		defineProperty({}, '_', {
			enumerable: false,
			configurable: true,
			set: function() {
				hasV8DefineBug = true;
			}
		}), '_', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: 1
	});
}