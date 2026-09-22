import { getPrototypeOf } from "../../impl/Reflect/getPrototypeOf";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.getPrototypeOf) {
	Reflect.getPrototypeOf = getPrototypeOf;
}