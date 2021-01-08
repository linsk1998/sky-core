
import { construct } from "../../impl/Reflect/construct";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.construct) {
	Reflect.construct = construct;
}