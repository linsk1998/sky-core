Function.prototype.bind = function bind(context) {
	var self = this, args = Array.from(arguments, 1);
	return function() {
		if(new.target) {
			throw new Error('Not allowed new bind class');
		}
		return self.apply(context, args.concat(Array.from(arguments)));
	};
};