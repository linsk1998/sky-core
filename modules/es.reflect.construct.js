import "core-js/modules/es.global-this";
import {construct} from "../impl/Reflect";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.construct){
	Reflect.construct=construct;
}
