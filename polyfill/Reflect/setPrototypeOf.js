import { Reflect } from "../Reflect";
import { setPrototypeOf } from "../../impl/Reflect/setPrototypeOf";

if(!Reflect.setPrototypeOf) {
	Reflect.setPrototypeOf = setPrototypeOf;
}