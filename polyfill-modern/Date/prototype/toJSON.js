import { toJSON } from "../../../native/Date/prototype/toJSON";
import { toJSON as toJSON$impl } from "../../../impl/Date/prototype/toJSON";
import { toJSON as toJSON$fixed } from "../../../impl-modern/Date/prototype/toJSON";

if(toJSON) {
	try {
		if(new Date(NaN).toJSON() !== null) {
			Date.prototype.toJSON = toJSON$fixed;
		}
	} catch(e) {
		Date.prototype.toJSON = toJSON$fixed;
	}
} else {
	Date.prototype.toJSON = toJSON$impl;
}