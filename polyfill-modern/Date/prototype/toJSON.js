import { Date } from "../../../native/Date";
import { toJSON } from "../../../impl-modern/Date/prototype/toJSON";

try {
	if(new Date(NaN).toJSON() !== null) {
		Date.prototype.toJSON = toJSON;
	}
} catch(e) {
	Date.prototype.toJSON = toJSON;
}