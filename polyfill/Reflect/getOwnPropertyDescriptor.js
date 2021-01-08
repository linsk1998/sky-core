
import getOwnPropertyDescriptor from "sky-core/pure/Object/getOwnPropertyDescriptor";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!Reflect.getOwnPropertyDescriptor) {
	Reflect.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
}