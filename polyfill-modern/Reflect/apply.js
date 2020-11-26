import "sky-core/polyfill/globalThis";
import { apply } from "../../impl/Reflect/apply";
if(!globalThis.Reflect) {
	globalThis.Reflect = new Object();
}
if(!Reflect.apply) {
	Reflect.apply = apply;
}