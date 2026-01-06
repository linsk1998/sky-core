import { Reflect } from "../../polyfill/Reflect";
import { get } from "../../impl-modern/Reflect/get";

if(!Reflect.get) {
	Reflect.get = get;
}