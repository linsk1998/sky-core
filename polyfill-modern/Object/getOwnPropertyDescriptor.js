
if(!Object.getOwnPropertyDescriptor){
	if(Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptor=function(obj,key){
			if(Object.prototype.hasOwnProperty.call(obj,key)){
				var r=new Object();
				r.enumerable=true;
				r.configurable=true;
				r.set=obj.__lookupSetter__(key);
				r.get=obj.__lookupGetter__(key);
				return r;
			}
		};
	}
}