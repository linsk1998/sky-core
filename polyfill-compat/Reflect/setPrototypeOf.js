import { setPrototypeOf } from "../../impl/Reflect/setPrototypeOf";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.setPrototypeOf) {
	Reflect.setPrototypeOf = setPrototypeOf;
}