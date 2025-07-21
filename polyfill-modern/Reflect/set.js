import { Reflect } from "../../polyfill/Reflect";
import { set } from "../../impl-modern/Reflect/set";

if(!Reflect.set) {
	Reflect.set = set;
}