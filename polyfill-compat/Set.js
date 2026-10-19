
import { Set } from "../native/Set";
import { create_Set } from "../impl/Set/create_Set";
if(!Set) {
	window.Set = create_Set();
}
