
import { Symbol } from "../native/Symbol";
import iterator from "sky-core/pure/Symbol/iterator";
import { Set } from "../native/Set";
import { fixSet, createSubSet } from "../impl-modern/Set";
import { createSet } from "../impl-compat/Set";
export default (function() {
	if(!Symbol) {
		if(Set && (Set.prototype.iterator || Set.prototype['@@iterator'])) {
			return fixSet();
		} else {
			return createSet();
		}
	} else {
		if(!Set.prototype[iterator]) {
			var SubSet = createSubSet();
			SubSet.prototype[iterator] = SubSet.prototype.values;
			return SubSet;
		}
		return Set;
	}
})();