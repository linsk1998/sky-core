
import { defineProperty } from "../../impl/Reflect/defineProperty";
import { Reflect } from "../Reflect";

if(!Reflect.defineProperty) {
	Reflect.defineProperty = defineProperty;
}