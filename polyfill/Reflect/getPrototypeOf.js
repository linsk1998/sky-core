
import getPrototypeOf from "sky-core/pure/Object/getPrototypeOf";
import "../Reflect";

if(!Reflect.getPrototypeOf) {
	Reflect.getPrototypeOf = getPrototypeOf;
}