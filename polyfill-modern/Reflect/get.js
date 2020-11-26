import "sky-core/polyfill/globalThis";
import { get as modern_get } from "../impl-modern/Reflect/get";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.get) {
	Reflect.get = modern_get;
}