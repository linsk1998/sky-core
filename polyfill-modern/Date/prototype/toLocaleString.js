import { Date } from "../../../native/Date";
import { toLocaleFormat } from "../../../impl/Date/prototype/toLocaleFormat";

var k = 'toLocaleString', p = Date.prototype;
//部分非IE浏览器的toLocaleString未国际化
if(new Date()[k]().match(/[a-z]/i)) {
	p[k] = function() {
		return toLocaleFormat.call(this, "%Y-%m-%d %H:%M:%S");
	};
}