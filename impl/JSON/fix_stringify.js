import { isNotNullObject } from "../../utils/isNotNullObject";
import { isFunction } from "../../utils/isFunction";
import { toString } from "../../native/Object/prototype/toString";

export function fix_stringify(old) {
	return function stringify(obj) {
		if(isNotNullObject(obj)) {
			var type = toString.call(obj);
			switch(type) {
				case '[object String]':
				case '[object Number]':
				case '[object Array]':
					return old(obj);
				default:
					if(obj.toJSON && isFunction(obj.toJSON)) {
						return stringify(obj.toJSON());
					}
					var items = [];
					var ownKeys = Object.keys(obj);
					for(var i = 0; i < ownKeys.length; i++) {
						var key = ownKeys[i];
						var value = obj[key];
						if(value !== void 0) {
							if(!isFunction(value)) {
								value = stringify(value);
								if(value) items.push(old(key) + ':' + value);
							}
						}
					}
					return "{" + items.join(",") + "}";
			}
		}
		return old(obj);
	};
};
