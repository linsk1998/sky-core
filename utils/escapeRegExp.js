
var stringEscapes = {
	'\\': '\\',
	"'": "'",
	'\n': 'n',
	'\r': 'r',
	'\u2028': 'u2028',
	'\u2029': 'u2029'
};
var regexpEscapes = {
	'0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
	'5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
	'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
	'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
	'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
};
var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;

export function escapeRegExp(str){//from lodash
	if(str){
		reRegExpChars.lastIndex = 0;
		return (reRegExpChars.test(str))
			? str.replace(reRegExpChars, function(chr, leadingChar, whitespaceChar) {
			if (leadingChar) {
				chr = regexpEscapes[chr];
			} else if (whitespaceChar) {
				chr = stringEscapes[chr];
			}
			return '\\' + chr;
		})
			: str;
	}
	return "(?:)";
};