import { createIteratorHelper } from "../../utils/createIteratorHelper";

export function fix_Map$arg(GMap) {
	function Map() {
		var arr = arguments[0];
		var map = new GMap();
		Object.setPrototypeOf(map, Object.getPrototypeOf(this));
		if(arr) {
			var _iterator = createIteratorHelper(arr), _step, item;
			if(!_iterator) throw new TypeError(typeof arr + " " + arr + " is not iterable.");
			try {
				for(_iterator.s(); !(_step = _iterator.n()).done;) {
					item = _step.value;
					map.set(item[0], item[1]);
				}
			} catch(err) {
				_iterator.e(err);
			} finally {
				_iterator.f();
			}
		}
		return map;
	}
	Object.setPrototypeOf(Map, GMap);
	Map.prototype = Object.create(GMap.prototype);
	return Map;
}
