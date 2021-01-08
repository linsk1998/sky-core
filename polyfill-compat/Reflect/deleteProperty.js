
import { deleteProperty as compat_deleteProperty } from "../impl-compat/Reflect/deleteProperty";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = compat_deleteProperty;
}