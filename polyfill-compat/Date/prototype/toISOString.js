import { definePrototype } from "sky-core/utils/definePrototype";
import { Date } from "../../../native/Date";
import { prefixIntrger2 } from "../../../utils/prefixIntrger2";
import { prefixIntrger3 } from "../../../utils/prefixIntrger3";

definePrototype(Date, 'toISOString', function() {
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
});