import "core-js/modules/es.global-this";
import {modern_set} from "../impl-modern/Object/object-property";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.set){
	Reflect.set=modern_set;
}