
import { Symbol } from "../impl/Symbol";
import { Set } from "../native/Set";
import { fixSet } from "../impl-modern/Set";
import { createSet } from "../impl-compat/Set";

if(Set) {
	if(!Symbol || !Set.prototype[Symbol.iterator]){
		this.Set = fixSet();
	}
} else {
	this.Set = createSet();
}