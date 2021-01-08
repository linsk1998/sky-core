
import getPrototypeOf from "sky-core/pure/Object/getPrototypeOf";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.getPrototypeOf) {
	Reflect.getPrototypeOf = getPrototypeOf;
}