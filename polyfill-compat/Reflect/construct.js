
import { construct } from "../../impl/Reflect/construct";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.construct) {
	Reflect.construct = construct;
}