
import { Set } from "../native/Set";
import { fixSet } from "../impl-modern/Set";
import { createSet } from "../impl-compat/Set";
export default (function() {
	if(Set) {
		if(!Symbol || !Set.prototype[Symbol.iterator]) {
			return fixSet();
		}
	} else {
		return createSet();
	}
	return Set;
})();