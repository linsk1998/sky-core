import "sky-core/polyfill/globalThis";
import { construct } from "../../impl/Reflect/construct";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.construct) {
	Reflect.construct = construct;
}