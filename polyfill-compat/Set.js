
import { Set } from "../native/Set";
import { createSet } from "../impl-compat/Set";
if(!Set) {
	window.Set = createSet();
}