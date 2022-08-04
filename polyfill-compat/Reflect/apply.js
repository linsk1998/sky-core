
import { apply } from "../../impl/Reflect/apply";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.apply) {
	Reflect.apply = apply;
}