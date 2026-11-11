import { Date } from "./constructor";
import { isString } from "../../utils/isString";

// Date 被替换后 parse 不存在；date-only 也需按 UTC 解析
if(!Date.parse || new Date("1970-01-01").getTime() !== 0) {
	Date.parse = function(str) {
		if(isString(str)) {
			var m = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
			if(m) return Date.UTC(+m[1], +m[2] - 1, +m[3]);
		}
		return new Date(str).getTime();
	};
}
