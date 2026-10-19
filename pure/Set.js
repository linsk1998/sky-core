
import { Symbol } from "../native/Symbol";
import iterator from "sky-core/pure/Symbol/iterator";
import { Set } from "../native/Set";
import { checkSetSupportConstructorIteratorReturn } from "../impl/Set/checkSetSupportConstructorIteratorReturn";
import { fix_Set$v8 } from "../impl/Set/fix_Set$v8";
import { fix_Set$arg } from "../impl/Set/fix_Set$arg";
import { fix_Set } from "../impl/Set/fix_Set";
import { create_Set } from "../impl/Set/create_Set";

export default (function() {
	if(Symbol) {
		if(Symbol.iterator) {
			if(!checkSetSupportConstructorIteratorReturn()) {
				return fix_Set$v8(Set);
			}
		} else {
			var SubSet = fix_Set$arg(Set);
			SubSet.prototype[iterator] = SubSet.prototype.values;
			return SubSet;
		}
	} else {
		if(Set && (Set.prototype.iterator || Set.prototype['@@iterator'])) {
			return fix_Set();
		} else {
			return create_Set();
		}
	}
	return Set;
})();
