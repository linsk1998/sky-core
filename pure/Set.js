
import { Set } from "../native/Set";
import { fixSet } from "../impl-modern/Set";
import { createSet } from "../impl-compat/Set";
export default (function() {
	if(Set) {
		if(!Symbol || !Set.prototype[Symbol.iterator]) {
			var S = fixSet();
			S.prototype[Symbol.iterator] = S.prototype.values;
			return S;
		}
	} else {
		return createSet();
	}
	return Set;
})();