if(!Object.setPrototypeOf){
	if('__proto__' in Object.prototype){
		Object.setPrototypeOf=function(object){
			return object.__proto__;
		};
	}
}