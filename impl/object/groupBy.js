import iterator from "sky-core/pure/Symbol/iterator";

export function groupBy(iterable, keySelector) {
	var entries = iterable[iterator];
	if(!entries) {
		throw new TypeError("object is not iterable");
	}
	var it = entries.call(iterable);
	var r = Object.create(null);
	var i = 0;
	var key, value, arr;
	while(true) {
		var next = it.next();
		if(next.done) break;
		try {
			value = next.value;
			key = keySelector(value, i++);
			if(key in r) {
				arr = r[key];
			} else {
				arr = r[key] = [];
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