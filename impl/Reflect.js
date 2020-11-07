export function apply(target, thisArgument, argumentsList){
	return Function.prototype.apply.call(target, thisArgument, argumentsList);
};
export function construct(target, argumentsList,NewTarget){
	var o=Object.create(target.prototype);
	if(!NewTarget){ NewTarget=o;}
	var o2=Reflect.apply(target,NewTarget,argumentsList);
	if(o2!==void 0){
		return o2;
	}
	return o;
};
export function defineProperty(target, propertyKey, attributes){
	try{
		Object.defineProperty(target, propertyKey, attributes);
		return true;
	}catch(e){
		console.error(e);
	}
	return false;
};