
import { set as modern_set } from "../../impl-modern/Reflect/set";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.set) {
	Reflect.set = modern_set;
}