import { Reflect as native_Reflect } from "../native/Reflect";
var Reflect = native_Reflect;
if(!Reflect) {
	this.Reflect = Reflect = new Object();
}
export { Reflect };