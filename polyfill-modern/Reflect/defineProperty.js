
import { defineProperty } from "../../impl/Reflect/defineProperty";
import "../../polyfill/Reflect";

if(!Reflect.defineProperty) {
	Reflect.defineProperty = defineProperty;
}