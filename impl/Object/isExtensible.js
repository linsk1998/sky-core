import { proto } from "../../support/proto";

export function isExtensible(o) {
	if((typeof o === "object")) {
		if(o !== null) {
			if(o instanceof Object) {
				return true;
			}
			if(proto) {
				return true;
			}
		}
	}
	return false;
}