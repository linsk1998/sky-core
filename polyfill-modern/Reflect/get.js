
import { get as modern_get } from "../../impl-modern/Reflect/get";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.get) {
	Reflect.get = modern_get;
}