
import { get } from "../../impl-compat/Reflect/get";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.get) {
	Reflect.get = get;
}