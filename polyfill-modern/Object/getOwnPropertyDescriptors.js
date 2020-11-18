import "./keys";
if(!Object.getOwnPropertyDescriptors){
	if(Object.prototype.__defineSetter__){
		Object.getOwnPropertyDescriptors=function(obj){
			var keys=Object.keys(obj);
			var i=keys.length;
			var descs={};
			while(i-->0){
				var key=keys[i];
				var set=obj.__lookupSetter__(key);
				var get=obj.__lookupGetter__(key);
				if(set || get){
					var desc=new Object();
					desc.enumerable=true;
					desc.configurable=true;
					desc.set=set;
					desc.get=get;
					descs[key]=desc;
				}
			}
			return descs;
		};
	}
}