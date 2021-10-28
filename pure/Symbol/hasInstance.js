import { Symbol } from "../../native/Symbol";
import { defineProperty } from "../../native/Object/defineProperty";
import nonEnumerable from "../../support/nonEnumerable";

export default (function() {
	if(!Symbol) {
		if(nonEnumerable) {
			defineProperty(Object.prototype, '@@hasInstance', { enumerable: false, configurable: false, writable: true });
		}
		return '@@hasInstance';
	} else {
		return Symbol.hasInstance || Symbol('hasInstance');
	}
})();