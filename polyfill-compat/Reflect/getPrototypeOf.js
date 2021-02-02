
import getPrototypeOf from "sky-core/pure/Object/getPrototypeOf";
import "../../polyfill/Reflect";

if(!Reflect.getPrototypeOf) {
	Reflect.getPrototypeOf = getPrototypeOf;
}