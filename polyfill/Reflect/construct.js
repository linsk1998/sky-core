
import { construct } from "../../impl/Reflect/construct";
if(!this.Reflect) {
	this.Reflect = new Object();
}
if(!this.construct) {
	this.construct = construct;
}