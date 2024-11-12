import iterator from "sky-core/pure/Symbol/iterator";

export function groupBy(iterable, keySelector) {
	var entries = iterable[iterator];
	if(!entries) {
		throw new TypeError("object is not iterable");
	}
	var it = entries.call(iterable);
	var r = new Map();
	var i = 0;
	var key, value, arr;
	while(true) {
		var next = it.next();
		if(next.done) break;
		try {
			value = next.value;
			key = keySelector(value, i++);
			if(r.has(key)) {
				arr = r.get(key);
			} else {
				arr = [];
				r.set(key, arr);
			}
			arr.push(value);
		} catch(e) {
			if(it.return) {
				try {
					it.return();
				} catch(e) { }
			}
			throw e;
		}
	}
	return r;
}