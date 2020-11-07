import "core-js/modules/es.global-this";
import {apply} from "../impl/Reflect";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.apply){
	Reflect.apply=apply;
}
