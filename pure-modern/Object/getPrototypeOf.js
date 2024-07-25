import { ff_getPrototypeOf, ie_getPrototypeOf } from "../../impl-modern/Object/getPrototypeOf";
import { Object } from "../../native/Object";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
export default !getPrototypeOf ?
	Object.__proto__ ?
		ff_getPrototypeOf :
		ie_getPrototypeOf
	:
	!setPrototypeOf ?
		ie_getPrototypeOf :
		getPrototypeOf
	;
