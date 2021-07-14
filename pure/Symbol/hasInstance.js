import { Symbol } from "../../native/Symbol";
import nonEnumerable from "../../support/nonEnumerable";

export default (function() {
	if(!Symbol) {
		if(nonEnumerable) {
			Object.defineProperty(Object.prototype, '@@hasInstance', { enumerable: false });
		}
		return '@@hasInstance';
	} else {
		return Symbol.hasInstance || Symbol('hasInstance');
	}
})();