
import { Set as native_Set } from "../native/Set";
import { create_Set } from "../impl/Set/create_Set";
var Set = native_Set;
if(!Set) {
	window.Set = Set = create_Set();
}
export { Set };
