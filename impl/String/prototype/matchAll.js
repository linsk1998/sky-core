import { isString } from "../../../utils/isString";

function matchAll(regExp) {
	if(this == null) {
		throw new TypeError("matchAll called on null or undefined");
	}
	var string = this;
	if(isString(regExp)) {
		regExp = new RegExp(regExp, 'g');
	} else if(regExp && regExp.global === false) {
		throw new TypeError("matchAll called with a non-global RegExp argument");
	}
	var it = {
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
		}
	};
	it[Symbol.iterator] = function() {
		return this;
	};
	return it;
}
export { matchAll };