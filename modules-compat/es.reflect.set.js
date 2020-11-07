import "core-js/modules/es.global-this";
import {compat_set} from "../impl-compat/Object/object-property";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.set){
	Reflect.set=compat_set;
}