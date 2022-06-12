import { Symbol } from "../../native/Symbol";
import { defineProperty } from "../../native/Object/defineProperty";
import { nonEnumerable } from "../../support/nonEnumerable";

export default (function() {
	if(!Symbol) {
		if(nonEnumerable) {
			defineProperty(Object.prototype, '@@iterator', { enumerable: false, configurable: false, writable: true });
		}
		return '@@iterator';
	} else {
		return Symbol.iterator || Symbol('iterator');
	}
})();