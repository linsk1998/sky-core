export function apply(target, thisArgument, argumentsList) {
	return Function.apply.call(target, thisArgument, argumentsList);
};