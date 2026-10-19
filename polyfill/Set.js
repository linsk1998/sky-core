import { Symbol } from "../native/Symbol";
import { Set } from "../native/Set";
import { checkSetSupportConstructorIteratorReturn } from "../impl/Set/checkSetSupportConstructorIteratorReturn";
import { fix_Set$v8 } from "../impl/Set/fix_Set$v8";
import { fix_Set } from "../impl/Set/fix_Set";
import { create_Set } from "../impl/Set/create_Set";


if(Symbol) {
	if(Symbol.iterator) {
		if(!checkSetSupportConstructorIteratorReturn()) {
			window.Set = fix_Set$v8(Set);
		}
	} else {
		// Safari8 支持values
		// Safari9 支持Symbol
		// Safari10 支持iterator
		Symbol.iterator = Symbol('iterator');
		Set.prototype[Symbol.iterator] = Set.prototype.values;
	}
} else {
	if(Set && (Set.prototype.iterator || Set.prototype['@@iterator'])) {
		window.Set = fix_Set();
	} else {
		window.Set = create_Set();
	}
}
