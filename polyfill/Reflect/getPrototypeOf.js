import { Reflect } from "../Reflect";
import { getPrototypeOf } from "../../impl/Reflect/getPrototypeOf";

if(!Reflect.getPrototypeOf) {
	Reflect.getPrototypeOf = getPrototypeOf;
}