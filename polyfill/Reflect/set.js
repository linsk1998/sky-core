import "sky-core/polyfill/globalThis";
import { set as compat_set } from "../impl-compat/Reflect/set";
import { set as modern_set } from "../impl-modern/Reflect/set";
import { supportAccessor } from "../utils/supportAccessor";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.set) {
	Reflect.set = supportAccessor ? modern_set : compat_set;
}