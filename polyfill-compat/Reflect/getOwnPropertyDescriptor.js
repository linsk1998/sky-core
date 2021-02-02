
import getOwnPropertyDescriptor from "sky-core/pure/Object/getOwnPropertyDescriptor";
import "../../polyfill/Reflect";

if(!Reflect.getOwnPropertyDescriptor) {
	Reflect.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
}