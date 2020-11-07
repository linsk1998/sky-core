
import {apply,construct,defineProperty} from "../impl/Reflect";
import {compat_set,compat_get,compat_deleteProperty} from "../impl-compat/Object/object-property";

if(!globalThis.Reflect){
	globalThis.Reflect={
		apply:apply,
		construct:construct,
		defineProperty:defineProperty,
		getPrototypeOf:Object.getPrototypeOf,
		getOwnPropertyDescriptor:Object.getOwnPropertyDescriptor
	};
	Reflect.set=compat_set;
	Reflect.get=compat_get;
	Reflect.deleteProperty=compat_deleteProperty;
}