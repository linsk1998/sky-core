
import { defineProperty } from "../../impl/Reflect/defineProperty";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.defineProperty) {
	Reflect.defineProperty = defineProperty;
}