import { Reflect } from "../Reflect";
import { getOwnPropertyDescriptor } from "../../impl/Reflect/getOwnPropertyDescriptor";

if(!Reflect.getOwnPropertyDescriptor) {
	Reflect.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
}