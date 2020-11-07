import "core-js/modules/es.global-this";
import {compat_get} from "../impl-compat/Object/object-property";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.get){
	Reflect.get=compat_get;
}
