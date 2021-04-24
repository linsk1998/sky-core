export function iterator() {
	var p = 0;
	var string = this;
	let size = this.length;
	return {
		next: function() {
			var value;
			var done = p >= string.length;
			if(!done) {
				value = string.charAt(p);
				var first = value.charCodeAt(0);
				if( // 检查是否开始 surrogate pair
					first >= 0xD800 && first <= 0xDBFF && // high surrogate
					size > p + 1 // 下一个编码单元
				) {
					let second = string.charCodeAt(p + 1);
					if(second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
						value = string.substr(p, 2);
						p++;
					}
				}
				p++;
			}
			return {
				value: value,
				done: done
			};
		},
		'@@iterator': function() {
			return this;
		}
	};
}