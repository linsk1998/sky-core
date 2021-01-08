
import { get as compat_get } from "../impl-compat/Reflect/get";
import { get as modern_get } from "../impl-modern/Reflect/get";
import { accessor } from "../support/accessor";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.get) {
	Reflect.get = accessor ? modern_get : compat_get;
}