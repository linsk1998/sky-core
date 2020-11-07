import "core-js/modules/es.global-this";
import {deleteProperty as compat_del} from "../impl-compat/Object/object-property";
import {deleteProperty as modern_del} from "../impl-modern/Object/object-property";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.deleteProperty){
	if(-[1,]){
		Reflect.deleteProperty=modern_del;
	}else{
		Reflect.deleteProperty=compat_del;
	}
}