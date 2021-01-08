import { toLocaleFormat } from "../../../impl/Date/prototype/toLocaleFormat";
//部分非IE浏览器的toLocaleString未国际化
if(new Date().toLocaleString().match(/[a-z]/i)) {
	Date.prototype.toLocaleString = function() {
		return toLocaleFormat.call(this, "%Y-%m-%d %H:%M:%S");
	};
}