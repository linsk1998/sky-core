export function entries() {
	var array = this;
	var index = 0;
	return {
		next() {
			var value;
			var done = array.length <= index;
			if(!done) {
				value = [index, array[index]];
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