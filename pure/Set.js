
import { Symbol } from "../native/Symbol";
import iterator from "sky-core/pure/Symbol/iterator";
import { Set } from "../native/Set";
import { fixSet, createSubSet, checkSetSupportConstructorIteratorReturn, createAndFixSubSet } from "../impl-modern/Set";
import { createSet } from "../impl-compat/Set";

export default (function() {
	if(Symbol) {
		if(Symbol.iterator) {
			if(!checkSetSupportConstructorIteratorReturn()) {
				return createAndFixSubSet();
			}
		} else {
			var SubSet = createSubSet();
			SubSet.prototype[iterator] = SubSet.prototype.entries;
			return SubSet;
		}
	} else {
		if(Set && (Set.prototype.iterator || Set.prototype['@@iterator'])) {
			return fixSet();
		} else {
			return createSet();
		}
	}
	return Set;
})();