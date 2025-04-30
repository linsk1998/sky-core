import { Symbol } from "../native/Symbol";
import { Set } from "../native/Set";
import { fixSet, createAndFixSubSet, checkSetSupportConstructorIteratorReturn } from "../impl-modern/Set";
import { createSet } from "../impl-compat/Set";


if(Symbol) {
	if(Symbol.iterator) {
		if(!checkSetSupportConstructorIteratorReturn()) {
			window.Set = createAndFixSubSet();
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
		window.Set = fixSet();
	} else {
		window.Set = createSet();
	}
}