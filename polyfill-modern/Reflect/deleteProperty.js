
import { deleteProperty as modern_deleteProperty } from "../impl-modern/Reflect/deleteProperty";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = modern_deleteProperty;
}