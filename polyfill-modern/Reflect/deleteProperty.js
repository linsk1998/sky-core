import { Reflect } from "../../polyfill/Reflect";
import { deleteProperty } from "../../impl-modern/Reflect/deleteProperty";

if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = deleteProperty;
}