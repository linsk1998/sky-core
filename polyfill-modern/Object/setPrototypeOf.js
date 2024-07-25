import { ff_setPrototypeOf, ie_setPrototypeOf } from "../../impl-modern/Object/setPrototypeOf";
import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
if(!setPrototypeOf) {
	if(Object.__proto__) {
		Object.setPrototypeOf = ff_setPrototypeOf;
	} else {
		Object.setPrototypeOf = ie_setPrototypeOf;
	}
}
