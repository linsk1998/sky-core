import "sky-core/polyfill/globalThis";
import { defineProperty } from "../../impl/Reflect/defineProperty";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.defineProperty) {
	Reflect.defineProperty = defineProperty;
}