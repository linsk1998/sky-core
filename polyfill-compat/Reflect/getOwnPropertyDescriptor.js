import "sky-core/polyfill/globalThis";
import { getOwnPropertyDescriptor } from "sky-core/pure/Object/getOwnPropertyDescriptor";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.getOwnPropertyDescriptor) {
	Reflect.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
}