import "sky-core/polyfill/globalThis";
import { get as compat_get } from "../impl-compat/Reflect/get";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.get) {
	Reflect.get = compat_get;
}