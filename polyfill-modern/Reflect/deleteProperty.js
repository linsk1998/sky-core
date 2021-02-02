
import { deleteProperty as modern_deleteProperty } from "../impl-modern/Reflect/deleteProperty";
import "../../polyfill/Reflect";

if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = modern_deleteProperty;
}