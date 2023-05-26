import { Date } from "../../../native/Date";
import { toLocaleFormat } from "../../../impl/Date/prototype/toLocaleFormat";
//部分非IE浏览器的toLocaleString未国际化
if(new Date().toLocaleDateString().match(/[a-z]/i)) {
	Date.prototype.toLocaleDateString = function() {
		return toLocaleFormat.call(this, "%Y-%m-%d");
	};
}