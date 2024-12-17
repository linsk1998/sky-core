import { Date } from "../../../native/Date";
import "./toISOString";

var k = 'toJSON', p = Date.prototype;
if(!(k in p) || new Date(0)[k]() !== '1970-01-01T00:00:00.000Z') {
	p[k] = function(_) {
		if(this.getTime && isNaN(this.getTime())) {
			return null;
		}
		return this.toISOString();
	};
}