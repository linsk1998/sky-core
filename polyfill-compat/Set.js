
import { Set as GSet } from "../native/Set";
import { Set as compat_Set } from "../impl-compat/Set";
if(!GSet) {
	this.Set = compat_Set;
}