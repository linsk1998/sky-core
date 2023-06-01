import { Symbol } from "../native/Symbol";
import { Set } from "../native/Set";
import { fixSet } from "../impl-modern/Set";
import { createSet } from "../impl-compat/Set";

if(!Symbol) {
	if(Set && (Set.prototype.iterator || Set.prototype['@@iterator'])) {
		window.Set = fixSet();
	} else {
		window.Set = createSet();
	}
} else {
	if(!Symbol.iterator) {
		Symbol.iterator = Symbol('iterator');
	}
	if(!Set.prototype[Symbol.iterator]) {
		Set.prototype[Symbol.iterator] = Set.prototype.values;
	}
}