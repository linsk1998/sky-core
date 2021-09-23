import { Symbol } from "../../native/Symbol";
import { nonEnumerable } from "../../support/nonEnumerable";

export default (function() {
	if(!Symbol) {
		if(nonEnumerable) {
			Object.defineProperty(Object.prototype, '@@iterator', { enumerable: false, configurable: false, writable: true });
		}
		return '@@iterator';
	} else {
		return Symbol.iterator || Symbol('iterator');
	}
})();