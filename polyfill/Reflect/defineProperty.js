
import { defineProperty } from "../../impl/Reflect/defineProperty";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.defineProperty) {
	Reflect.defineProperty = defineProperty;
}