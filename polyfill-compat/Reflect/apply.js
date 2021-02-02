
import { apply } from "../../impl/Reflect/apply";
import "../../polyfill/Reflect";

if(!Reflect.apply) {
	Reflect.apply = apply;
}