export function values() {
	var array = this;
	var index = 0;
	return {
		next: function() {
			var value;
			var done = array.length <= index;
			if(!done) {
				value = array[index];
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