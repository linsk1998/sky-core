
import { get as modern_get } from "../impl-modern/Reflect/get";
import "../../polyfill/Reflect";

if(!Reflect.get) {
	Reflect.get = modern_get;
}