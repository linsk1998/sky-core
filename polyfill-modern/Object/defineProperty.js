
if(!Object.defineProperty) {
	if(Object.prototype.__defineSetter__){
		Object.defineProperty=function(obj, prop, descriptor){
			if('value' in descriptor){
				delete obj[prop];
				obj[prop]=descriptor.value;
			}else{
				if(descriptor.get) obj.__defineGetter__(prop,descriptor.get);
				if(descriptor.set) obj.__defineSetter__(prop,descriptor.set);
			}
		};
	}
}