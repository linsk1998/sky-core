
import { set as compat_set } from "../../impl-compat/Reflect/set";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.set) {
	Reflect.set = compat_set;
}