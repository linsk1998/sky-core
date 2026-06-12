import { toString } from "../../native/Object/prototype/toString";
import { isFunction } from "../../utils/isFunction";
import { escapeString } from "../../utils/escapeString";

export function stringify(obj) {
	switch(obj) {
		case undefined:
			break;
		case null:
			return "null";
		case false:
		case true:
			return obj;
		default:
			var type = toString.call(obj);
			switch(type) {
				case '[object String]':
					return '"' + escapeString(obj) + '"';
				case '[object Number]':
					return isNaN(obj) ? "null" : obj.toString();
				case '[object Array]':
					return "[" + obj.map(arrayItemStringify).join(",") + "]";
				default:
					if(obj.toJSON && isFunction(obj.toJSON)) {
						return stringify(obj.toJSON());
					}
					var items = [];
					var ownKeys = Object.keys(obj);
					for(var i = 0; i < ownKeys.length; i++) {
						var key = ownKeys[i];
						var value = obj[key];
						if(value !== void 0 && !isFunction(value)) {
							value = stringify(value);
							if(value) items.push('"' + escapeString(key) + '":' + value);
						}
					}
					return "{" + items.join(",") + "}";
			}
	}
}

function arrayItemStringify(value) {
	value = stringify(value);
	if(value === void 0) return "null";
	return value;
}
