import { compat_keys } from "./object-enum";
export function compat_defineProperty(obj, prop, descriptor){
	if('value' in descriptor){
		obj[prop]=descriptor.value;
	}else{
		console.warn("ES3 do NOT support accessor.");
	}
	obj['@@desc:'+prop]=descriptor;
};

var native_defineProperty=Object.defineProperty;
export function ie8_defineProperty(obj, prop, descriptor){
	if(obj instanceof Object){
		compat_defineProperty.apply(Object,arguments);
	}else{
		delete descriptor.enumerable;
		native_defineProperty.apply(Object,arguments);
	}
};
export function compat_getOwnPropertyDescriptor(obj,prop){
	var key='@@desc:'+prop;
	if(Object.prototype.hasOwnProperty.call(obj,key)){
		return obj[key];
	}
	if(Object.prototype.hasOwnProperty.call(obj,prop)){
		return {value: obj[prop], writable: true, enumerable: true, configurable: true};
	}
};
export function compat_getOwnPropertyDescriptors(obj){
	var o={};
	var keys=[];
	for(var key in obj){
		if(key.startsWith("@@desc:")){
			if(Object.prototype.hasOwnProperty.call(obj,key)){
				var prop=key.substring(7);
				o[prop]=obj[key];
				keys.push(prop);
			}
		}
	}
	var ks=compat_keys(obj);
	var i=ks.length;
	while(i-->0){
		var k=ks[i];
		if(!keys.includes(k)){
			var desc=new Object();
			desc.value=obj[k];
			desc.writable=true;
			desc.enumerable=true;
			desc.configurable=true;
			o[k]=desc;
		}
	}
	return o;
};
export function compat_getOwnPropertyNames(obj){
	var keys=compat_keys(obj);
	for(var key in obj){
		if(key.startsWith("@@desc:")){
			if(Object.prototype.hasOwnProperty.call(obj,key)){
				var prop=key.substring(7);
				if(!keys.includes(prop)){
					keys.push(prop);
				}
			}
		}
	}
	return keys;
};
export function compat_get(target,propertyKey,receiver){
	if(receiver===void 0){ receiver=target}
	var desc=target["@@desc:"+propertyKey];
	if(desc){
		if(desc.get){
			return desc.get.call(receiver);
		}
		return desc.value;
	}
	return target[propertyKey];
};
export function compat_set(target,propertyKey,value,receiver){
	if(receiver===void 0){ receiver=target}
	var desc=target["@@desc:"+propertyKey];
	if(desc){
		if(desc.set){
			try{
				desc.set.call(receiver,value);
				return true;
			}catch(e){
				return false;
			}
		}
		desc.value=value;
		return true;
	}
	target[propertyKey]=value;
	return true;
};
export function compat_deleteProperty(target, prop){
	delete target["@@desc:"+prop];
	delete target[prop];
};