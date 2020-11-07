import "core-js/modules/es.global-this";
import {get as compat_get} from "../impl-compat/Object/object-property";
import {get as modern_get} from "../impl-modern/Object/object-property";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.get){
	if(-[1,]){
		Reflect.get=modern_get;
	}else{
		Reflect.get=compat_get;
	}
}