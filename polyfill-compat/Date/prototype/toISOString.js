import { prefixIntrger2 } from "../../../utils/prefixIntrger2";
import { prefixIntrger3 } from "../../../utils/prefixIntrger3";

if(!Date.prototype.toISOString) {
	Date.prototype.toISOString = function() {
		var time = this.getTime();
		if(isNaN(time)) {
			throw new RangeError("Invalid time value");
		}
		return this.getUTCFullYear() +
			'-' + prefixIntrger2(this.getUTCMonth() + 1) +
			'-' + prefixIntrger2(this.getUTCDate()) +
			'T' + prefixIntrger2(this.getUTCHours()) +
			':' + prefixIntrger2(this.getUTCMinutes()) +
			':' + prefixIntrger2(this.getUTCSeconds()) +
			'.' + prefixIntrger3(this.getUTCMilliseconds()) + 'Z';
	};
}