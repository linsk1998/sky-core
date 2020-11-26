import "sky-core/polyfill/globalThis";
import { getPrototypeOf } from "sky-core/pure/Object/getPrototypeOf";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.getPrototypeOf) {
	Reflect.getPrototypeOf = getPrototypeOf;
}