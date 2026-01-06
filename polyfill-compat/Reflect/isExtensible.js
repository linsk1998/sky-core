import { isExtensible } from "../../impl/Reflect/isExtensible";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.isExtensible) {
	Reflect.isExtensible = isExtensible;
}