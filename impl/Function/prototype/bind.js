import { slice } from "../../../native/Array/prototype/slice";

export function bind(context) {
	var self = this, args = slice.call(arguments, 1);
	var Bind = function() {
		if(this instanceof Bind) {
			self.apply(this, args.concat(slice.call(arguments)));
			return;
		}
		return self.apply(context, args.concat(slice.call(arguments)));
	};
	return Bind;
}