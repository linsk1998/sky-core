
import { apply } from "../../impl/Reflect/apply";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.apply) {
	Reflect.apply = apply;
}