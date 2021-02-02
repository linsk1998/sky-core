
import { set as modern_set } from "../impl-modern/Reflect/set";
import "../../polyfill/Reflect";

if(!Reflect.set) {
	Reflect.set = modern_set;
}