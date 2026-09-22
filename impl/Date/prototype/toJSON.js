import { toISOString } from "./toISOString";

export function toJSON(_) {
	if(isNaN(this.getTime())) {
		return null;
	}
	return toISOString.call(this);
};