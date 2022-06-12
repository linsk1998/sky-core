
export function raw(callSite) {
	var raw = callSite.raw;
	if(!raw) {
		throw new TypeError();
	}
	var args = arguments;
	return Array.from(raw, function(str, i) {
		if(i > 0 && i < args.length) {
			return args[i] + str;
		}
		return str;
	}).join('');
}