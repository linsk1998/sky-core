import { Object } from "../../native/Object";
import { proto } from "../../support/proto";
import { hasOwn as compat_hasOwn } from "../../impl-compat/Object/hasOwn";
import { hasOwn as modern_hasOwn } from "../../impl-modern/Object/hasOwn";

if(!Object.hasOwn) {
	if(proto) {
		Object.hasOwn = modern_hasOwn;
	} else {
		Object.hasOwn = compat_hasOwn;
	}
} 