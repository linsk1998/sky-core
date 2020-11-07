
import {apply,construct,defineProperty} from "../impl/Reflect";
import {compat_set,compat_get,compat_deleteProperty} from "../impl-compat/Object/object-property";
import {modern_set,modern_get,modern_deleteProperty} from "../impl-modern/Object/object-property";

if(!globalThis.Reflect){
	globalThis.Reflect={
		apply:apply,
		construct:construct,
		defineProperty:defineProperty,
		getPrototypeOf:Object.getPrototypeOf,
		getOwnPropertyDescriptor:Object.getOwnPropertyDescriptor
	};
	if(-[1,]){
		Reflect.set=modern_set;
		Reflect.get=modern_get;
		Reflect.deleteProperty=modern_deleteProperty;
	}else{
		Reflect.set=compat_set;
		Reflect.get=compat_get;
		Reflect.deleteProperty=compat_deleteProperty;
	}
}