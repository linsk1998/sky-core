
import { set as modern_set } from "../impl-modern/Reflect/set";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.set) {
	Reflect.set = modern_set;
}