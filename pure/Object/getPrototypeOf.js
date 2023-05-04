import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { getPrototypeOf as compat_getPrototypeOf } from "../../impl-compat/Object/getPrototypeOf";
import { ff_getPrototypeOf, ie_getPrototypeOf } from "../../impl-modern/Object/getPrototypeOf";

export default !getPrototypeOf ?
	Object.prototype.__proto__ ?
		ff_getPrototypeOf :
		compat_getPrototypeOf
	:
	!setPrototypeOf ?
		ie_getPrototypeOf :
		Object.getPrototypeOf;