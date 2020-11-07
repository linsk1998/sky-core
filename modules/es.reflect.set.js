import "core-js/modules/es.global-this";
import {set as compat_set} from "../impl-compat/Object/object-property";
import {set as modern_set} from "../impl-modern/Object/object-property";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.set){
	if(-[1,]){
		Reflect.set=modern_set;
	}else{
		Reflect.set=compat_set;
	}
}