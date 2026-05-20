import { toJSON as native_toJSON } from "../../../native/Date/prototype/toJSON";

export function toJSON(_) {
	if(isNaN(this.getTime())) {
		return null;
	}
	return native_toJSON.call(this);
};