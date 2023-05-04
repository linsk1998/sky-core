import { hasEnumBug } from "../../utils/hasEnumBug";
import { ff_setPrototypeOf, ie_setPrototypeOf } from "../../impl-modern/Object/setPrototypeOf";
import { setPrototypeOf as compat_setPrototypeOf } from "../../impl-compat/Object/setPrototypeOf";
import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
if(!setPrototypeOf) {
	if(Object.prototype.__proto__) {
		Object.setPrototypeOf = ff_setPrototypeOf;
	} else if(hasEnumBug) {
		Object.setPrototypeOf = compat_setPrototypeOf;
	} else {
		Object.setPrototypeOf = ie_setPrototypeOf;
	}
}
