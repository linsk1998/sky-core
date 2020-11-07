import "core-js/modules/es.global-this";
import "core-js/modules/es.object.define-property";
import {defineProperty} from "../impl/Reflect";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.defineProperty){
	Reflect.defineProperty=defineProperty;
}