import { Symbol } from "../../native/Symbol";
import { defineProperty } from "../../native/Object/defineProperty";
import { nonEnumerable } from "../../support/nonEnumerable";

export default (function() {
	if(!Symbol) {
		if(nonEnumerable) {
			defineProperty(Object.prototype, '@@metadata', { enumerable: false, configurable: false, writable: true });
		}
		return '@@metadata';
	} else {
		return Symbol.metadata || Symbol.for("Symbol.metadata");
	}
})();