import { proto } from "../../support/proto";

export function isSealed(o) {
	if((typeof o === "object")) {
		if(o !== null) {
			if(o instanceof Object) {
				return false;
			}
			if(proto) {
				return false;
			}
		}
	}
	return true;
}