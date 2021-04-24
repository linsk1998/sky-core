
function matchAll(regExp) {
	var string = this;
	if(typeof regExp === "string") {
		regExp = new RegExp(regExp, 'g');
	} else if(regExp && regExp.global === false) {
		throw new TypeError();
	}
	return {
		next: function() {
			var value = regExp.exec(string);
			if(value) {
				return {
					value: value,
					done: false
				};
			} else {
				return {
					value: undefined,
					done: true
				};
			}
		},
		[Symbol.iterator]: function() {
			return this;
		}
	};
}
export { matchAll };