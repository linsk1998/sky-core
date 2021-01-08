//TODO
// from core-js
export function fromCodePoint() {
	var elements = [];
	var length = arguments.length;
	var i = 0;
	var code;
	while(length > i) {
		code = +arguments[i++];
		if(toAbsoluteIndex(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
		elements.push(code < 0x10000
			? fromCharCode(code)
			: fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00)
		);
	} return elements.join('');
}

function toAbsoluteIndex(index, length) {
	var integer = toInteger(index);
	return integer < 0 ? max(integer + length, 0) : min(integer, length);
};
function toInteger(argument) {
	return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};