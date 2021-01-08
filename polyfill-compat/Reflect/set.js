
import { set as compat_set } from "../impl-compat/Reflect/set";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.set) {
	Reflect.set = compat_set;
}