import "sky-core/polyfill/globalThis";
import { get as compat_get } from "../impl-compat/Reflect/get";
import { get as modern_get } from "../impl-modern/Reflect/get";
import { supportAccessor } from "../utils/supportAccessor";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.get) {
	Reflect.get = supportAccessor ? modern_get : compat_get;
}