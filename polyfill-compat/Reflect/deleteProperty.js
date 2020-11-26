import "sky-core/polyfill/globalThis";
import { deleteProperty as compat_deleteProperty } from "../impl-compat/Reflect/deleteProperty";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = compat_deleteProperty;
}