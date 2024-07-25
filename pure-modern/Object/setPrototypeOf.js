import { ff_setPrototypeOf, ie_setPrototypeOf } from "../../impl-modern/Object/setPrototypeOf";
import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
export default setPrototypeOf ||
	Object.__proto__ ?
	ff_setPrototypeOf :
	ie_setPrototypeOf
	;