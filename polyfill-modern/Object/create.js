
if(!Object.create){
	if('__proto__' in Object.prototype){
		Object.create=function create(proto){
			function F(){}
			F.prototype = proto;
			return new F();
		};
	}
}