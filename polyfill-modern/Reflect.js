
import {apply,construct,defineProperty} from "../impl/Reflect";
import {modern_set,modern_get,modern_deleteProperty} from "../impl-modern/Object/object-property";

if(!globalThis.Reflect){
	globalThis.Reflect={
		apply:apply,
		construct:construct,
		defineProperty:defineProperty,
		getPrototypeOf:Object.getPrototypeOf,
		getOwnPropertyDescriptor:Object.getOwnPropertyDescriptor
	};
	Reflect.set=modern_set;
	Reflect.get=modern_get;
	Reflect.deleteProperty=modern_deleteProperty;
}