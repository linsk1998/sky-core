import { Date } from "../../../native/Date";
import "./toISOString";
if(!Date.prototype.toJSON || new Date(0).toJSON() !== '1970-01-01T00:00:00.000Z') {
	Date.prototype.toJSON = function(_) {
		if(this.getTime && isNaN(this.getTime())) {
			return null;
		}
		return this.toISOString();
	};
}