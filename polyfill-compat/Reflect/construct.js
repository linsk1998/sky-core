
import { construct } from "../../impl/Reflect/construct";
import "../../polyfill/Reflect";

if(!Reflect.construct) {
	Reflect.construct = construct;
}