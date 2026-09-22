import { has } from "../../impl/Reflect/has";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.has) {
	Reflect.has = has;
}