// 这个是给cookie专用的，字符串自带的trim会导致\u3000\xA0被去除
function trim(s) {
	return s.replace(/^\s+|\s+$/g, '');
}

export function parseCookie(str) {
	var obj = [];
	var pairs = str.split(/; */);
	var len = pairs.length;

	for(var i = 0; i < len; i++) {
		var pair = pairs[i];
		var eqIdx = pair.indexOf('=');

		// skip things that don't look like key=value
		if(eqIdx < 0) {
			continue;
		}

		var key = trim(pair.substring(0, eqIdx));
		var val = trim(pair.substring(++eqIdx, pair.length));

		obj.push({
			name: key,
			value: val,
		});
	}

	return obj;
}
