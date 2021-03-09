
import { get as compat_get } from "../../impl-compat/Reflect/get";
import "../../polyfill/Reflect";

if(!Reflect.get) {
	Reflect.get = compat_get;
}