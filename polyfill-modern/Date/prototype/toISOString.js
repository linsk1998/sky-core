import { Date } from "../../../native/Date";
import { toISOString } from "../../../impl/Date/prototype/toISOString";

// safari 5
if(new Date(-1).toISOString !== '1969-12-31T23:59:59.999Z') {
	Date.prototype.toISOString = toISOString;
}
