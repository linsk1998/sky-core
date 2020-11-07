import "core-js/modules/es.global-this";
import {modern_get} from "../impl-modern/Object/object-property";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.get){
	Reflect.get=modern_get;
}