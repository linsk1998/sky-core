
import getOwnPropertyDescriptor from "sky-core/pure/Object/getOwnPropertyDescriptor";
import { Reflect } from "../Reflect";

if(!Reflect.getOwnPropertyDescriptor) {
	Reflect.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
}