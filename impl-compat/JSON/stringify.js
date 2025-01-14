import { slice } from "../../native/String/prototype/slice";
import { isSymbol } from "../../utils-compat/isSymbol";
import { isFunction } from "../../utils/isFunction";

var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
export function escapeString(str) {//from lodash
	rx_escapable.lastIndex = 0;
	return rx_escapable.test(str)
		? str.replace(rx_escapable, function(a) {
			var meta = {
				"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"": "\\\"", "\\": "\\\\"
			};
			var c = meta[a];
			return typeof c === "string"
				? c
				: "\\u" + slice.call("0000" + a.charCodeAt(0).toString(16), -4);
		}) : str;
};
export function stringify(obj) {
	switch(obj) {
		case undefined:
		case null:
			return "null";
		case false:
		case true:
			return obj;
		default:
			var type = Object.prototype.toString.call(obj);
			switch(type) {
				case '[object String]':
					return '"' + escapeString(obj) + '"';
				case '[object Number]':
					return isNaN(obj) ? "null" : obj.toString();
				case '[object Array]':
					return "[" + obj.map(stringify).join(",") + "]";
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
							if(!isFunction(value) && !isSymbol(value)) {
								items.push('"' + escapeString(key) + '":' + stringify(value));
							}
						}
					}
					return "{" + items.join(",") + "}";
			}
	}
}