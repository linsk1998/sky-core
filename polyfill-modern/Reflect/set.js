import "sky-core/polyfill/globalThis";
import { set as modern_set } from "../impl-modern/Reflect/set";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.set) {
	Reflect.set = modern_set;
}