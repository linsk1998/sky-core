
import getPrototypeOf from "sky-core/pure/Object/getPrototypeOf";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.getPrototypeOf) {
	Reflect.getPrototypeOf = getPrototypeOf;
}