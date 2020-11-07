import "core-js/modules/es.global-this";
import {modern_deleteProperty} from "../impl-modern/Object/object-property";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.deleteProperty){
	Reflect.deleteProperty=modern_deleteProperty;
}