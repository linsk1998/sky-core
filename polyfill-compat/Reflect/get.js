
import { get as compat_get } from "../impl-compat/Reflect/get";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.get) {
	Reflect.get = compat_get;
}