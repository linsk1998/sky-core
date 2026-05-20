import { Date } from "../../../native/Date";
import { toJSON } from "../../../impl/Date/prototype/toJSON";

try {
	if(!('toJSON' in Date.prototype) || new Date(0).toJSON() !== '1970-01-01T00:00:00.000Z' || new Date(NaN).toJSON() !== null) {
		Date.prototype.toJSON = toJSON;
	}
} catch(e) {
	Date.prototype.toJSON = toJSON;
}