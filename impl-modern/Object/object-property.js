
export function modern_defineProperty(obj, prop, descriptor){
	if('value' in descriptor){
		delete obj[prop];
		obj[prop]=descriptor.value;
	}else{
		if(descriptor.get) obj.__defineGetter__(prop,descriptor.get);
		if(descriptor.set) obj.__defineSetter__(prop,descriptor.set);
	}
};
export function modern_getOwnPropertyDescriptor(obj,key){
	if(Object.prototype.hasOwnProperty.call(obj,key)){
		var r={
			enumerable:true,
			configurable:true
		};
		r.set=obj.__lookupSetter__(key);
		r.get=obj.__lookupGetter__(key);
		return r;
	}
};
export function modern_getOwnPropertyDescriptors(obj){
	var keys=Object.keys(obj);
	var i=keys.length;
	var descs={};
	while(i-->0){
		var key=keys[i];
		var set=obj.__lookupSetter__(key);
		var get=obj.__lookupGetter__(key);
		if(set || get){
			var desc={
				enumerable:true,
				configurable:true
			};
			desc.set=set;
			desc.get=get;
			descs[key]=desc;
		}
	}
	return descs;
}
export function modern_getOwnPropertyNames(obj){
	var keys=Object.keys(obj);
	var i=keys.length;
	var names=[];
	while(i-->0){
		var key=keys[i];
		var set=obj.__lookupSetter__(key);
		var get=obj.__lookupGetter__(key);
		if(set || get){
			names.push(key);
		}
	}
	return descs;
}
export function modern_getPrototypeOf(object){
	return object.__proto__;
};
export function modern_setPrototypeOf(obj,proto){
	obj.__proto__=proto;
	return obj; 
}

export function modern_get(target,propertyKey,receiver){
	if(receiver===void 0){ receiver=target}
	var o=target,attributes;
	do{
		attributes=Object.getOwnPropertyDescriptor(o,propertyKey);
		if(attributes){
			if(attributes.get){
				return attributes.get.call(receiver);
			}
			return attributes.value;
		}
		o=Object.getPrototypeOf(o);
	}while(o && o!==Object.prototype);
	return target[propertyKey];
};
export function modern_set(target,propertyKey,value,receiver){
	if(receiver===void 0){ 
		try{
			target[propertyKey]=value;
			return true;
		}catch(e){
			return false;
		}
	}
	var o=target,desc;
	do{
		desc=Object.getOwnPropertyDescriptor(o,propertyKey);
		if(desc){
			if(desc.set){
				try{
					descriptor.set.call(receiver,value);
					return true;
				}catch(e){
					return false;
				}
			}else if('value' in desc){
				target[propertyKey]=value;
				return true;
			}
		}
		o=Object.getPrototypeOf(o);
	}while(o && o!==Object.prototype);
	target[propertyKey]=value;
	return true;
};
export function modern_deleteProperty(target, key){
	delete target[key];
};