import { slice } from "../../../native/Array/prototype/slice";
if(!Function.prototype.bind) {
	Function.prototype.bind = function(context) {
		var self = this, args = slice.call(arguments, 1);
		return function() {
			return self.apply(context, args.concat(slice.call(arguments)));
		};
	};
}