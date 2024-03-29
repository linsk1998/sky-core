
export function keys() {
	var array = this;
	var index = 0;
	return {
		next: function() {
			var value;
			var done = array.length <= index;
			if(!done) {
				value = index;
				index++;
			}
			return {
				done: done, value: value
			};
		},
		'@@iterator': function() {
			return this;
		},
		'@@toStringTag': 'Array Iterator'
	};
}