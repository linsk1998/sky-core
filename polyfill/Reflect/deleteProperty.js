import "sky-core/polyfill/globalThis";
import { deleteProperty as compat_deleteProperty } from "../impl-compat/Reflect/deleteProperty";
import { deleteProperty as modern_deleteProperty } from "../impl-modern/Reflect/deleteProperty";
import { supportAccessor } from "../utils/supportAccessor";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = supportAccessor ? modern_deleteProperty : compat_deleteProperty;
}