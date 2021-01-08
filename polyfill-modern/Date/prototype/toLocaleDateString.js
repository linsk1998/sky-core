import { toLocaleFormat } from "../../../impl/Date/prototype/toLocaleFormat";
//部分非IE浏览器的toLocaleString未国际化
if(new Date().toLocaleTimeString().match(/[a-z]/i)) {
	Date.prototype.toLocaleTimeString = function() {
		return toLocaleFormat.call(this, "%H:%M:%S");
	};
}