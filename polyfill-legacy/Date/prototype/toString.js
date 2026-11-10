import { Date } from "../../../native/Date";

// legacy 浏览器里 Opera 9.64 对 NaN Date 的 toString 返回 'NaN' 而非 'Invalid Date'
if(String(new Date(NaN)) !== 'Invalid Date') {
	var orig = Date.prototype.toString;
	Date.prototype.toString = function() {
		if(isNaN(this.getTime())) return 'Invalid Date';
		return orig.call(this);
	};
}
