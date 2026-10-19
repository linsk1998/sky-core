import { createIteratorHelper } from "../../utils/createIteratorHelper";

export function fix_Set$arg(GSet) {
	function Set() {
		var arr = arguments[0];
		var set = new GSet();
		Object.setPrototypeOf(set, Object.getPrototypeOf(this));
		if(arr) {
			var _iterator = createIteratorHelper(arr), _step, item;
			if(!_iterator) throw new TypeError(typeof arr + " " + arr + " is not iterable.");
			try {
				for(_iterator.s(); !(_step = _iterator.n()).done;) {
					item = _step.value;
					set.add(item);
				}
			} catch(err) {
				_iterator.e(err);
			} finally {
				_iterator.f();
			}
		}
		return set;
	}
	Object.setPrototypeOf(Set, GSet);
	Set.prototype = Object.create(GSet.prototype);
	return Set;
}
