import Symbol from "sky-core/pure/Symbol";

if(!Function.prototype[Symbol.hasInstance]) {
	Function.prototype[Symbol.hasInstance] = function(instance) {
		return instance instanceof this;
	};
}