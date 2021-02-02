
import { deleteProperty as compat_deleteProperty } from "../impl-compat/Reflect/deleteProperty";
import "../../polyfill/Reflect";

if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = compat_deleteProperty;
}