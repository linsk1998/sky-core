
import { defineProperty } from "../../impl/Reflect/defineProperty";
import "../Reflect";

if(!Reflect.defineProperty) {
	Reflect.defineProperty = defineProperty;
}