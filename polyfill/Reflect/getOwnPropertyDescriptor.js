
import getOwnPropertyDescriptor from "sky-core/pure/Object/getOwnPropertyDescriptor";
import "../Reflect";

if(!Reflect.getOwnPropertyDescriptor) {
	Reflect.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
}