import "sky-core/polyfill/globalThis";
import { set as compat_set } from "../impl-compat/Reflect/set";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.set) {
	Reflect.set = compat_set;
}