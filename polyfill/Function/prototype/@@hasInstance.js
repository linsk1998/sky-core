
import hasInstance from "sky-core/pure/Symbol/hasInstance";
if(!Function.prototype[hasInstance]) {
	Function.prototype[hasInstance] = function(instance) {
		return instance instanceof this;
	};
}