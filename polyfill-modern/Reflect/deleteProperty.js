import "sky-core/polyfill/globalThis";
import { deleteProperty as modern_deleteProperty } from "../impl-modern/Reflect/deleteProperty";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = modern_deleteProperty;
}