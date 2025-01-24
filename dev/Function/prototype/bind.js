import { slice } from "../../../native/Array/prototype/slice";

Function.prototype.bind = function bind(context) {
	var self = this, args = slice.call(arguments, 1);
	return function() {
		if(new.target) {
			throw new Error('Not allowed new bind class');
		}
		return self.apply(context, args.concat(slice.call(arguments)));
	};
};