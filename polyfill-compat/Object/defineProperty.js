import {compat_defineProperty} from "../../impl-compat/Object/object-property";

if(!Object.defineProperty) {
	if(!Object.prototype.__defineSetter__){
		Object.defineProperty=compat_defineProperty;
	}
}else if(!Object.defineProperties){
	var native_defineProperty=Object.defineProperty;
	Object.defineProperty=function(obj, prop, descriptor){
		if(obj instanceof Object){
			compat_defineProperty.apply(Object,arguments);
		}else{
			delete descriptor.enumerable;
			native_defineProperty.apply(Object,arguments);
		}
	};
}