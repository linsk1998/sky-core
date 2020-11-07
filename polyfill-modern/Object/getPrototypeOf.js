if(!Object.getPrototypeOf){
	if('__proto__' in Object.prototype){
		Object.getPrototypeOf=function(object){
			return object.__proto__;
		};
	}
}