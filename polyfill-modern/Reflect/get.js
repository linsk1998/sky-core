
import { get as modern_get } from "../impl-modern/Reflect/get";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.get) {
	Reflect.get = modern_get;
}