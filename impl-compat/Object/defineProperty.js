export function compat_defineProperty(obj, prop, descriptor){
	if('value' in descriptor){
		obj[prop]=descriptor.value;
	}else{
		console.warn("ES3 do NOT support accessor.");
	}
	obj['@@desc:'+prop]=descriptor;
};

import {defineProperty as native_defineProperty} from "../../native/Object/defineProperty";
export function ie8_defineProperty(obj, prop, descriptor){
	if(obj instanceof Object){
		compat_defineProperty.apply(Object,arguments);
	}else{
		delete descriptor.enumerable;
		native_defineProperty.apply(Object,arguments);
	}
};
export function defineProperty(obj, prop, descriptor){
	if(native_defineProperty){
		if(obj instanceof Object){
			compat_defineProperty.apply(Object,arguments);
		}else{
			delete descriptor.enumerable;
			native_defineProperty.apply(Object,arguments);
		}
	}else{
		compat_defineProperty.apply(Object,arguments);
	}
};