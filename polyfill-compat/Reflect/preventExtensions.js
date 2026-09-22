import { preventExtensions } from "../../impl/Reflect/preventExtensions";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.preventExtensions) {
	Reflect.preventExtensions = preventExtensions;
}