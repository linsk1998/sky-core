export function apply(target, thisArgument, argumentsList){
	return Function.prototype.apply.call(target, thisArgument, argumentsList);
};