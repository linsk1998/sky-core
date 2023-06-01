import { Reflect as native_Reflect } from "../native/Reflect";
var Reflect = native_Reflect;
if(!Reflect) {
	window.Reflect = Reflect = new Object();
}
export { Reflect };