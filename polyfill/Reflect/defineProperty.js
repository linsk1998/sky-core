import { Reflect } from "../Reflect";
import { defineProperty } from "../../impl/Reflect/defineProperty";

if(!Reflect.defineProperty) {
	Reflect.defineProperty = defineProperty;
}