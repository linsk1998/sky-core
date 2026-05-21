import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { getPrototypeOf as compat_getPrototypeOf } from "../../impl-compat/Object/getPrototypeOf";
import { getPrototypeOf$legacy, getPrototypeOf$ie } from "../../impl-modern/Object/getPrototypeOf";

export default !getPrototypeOf ?
	Object.__proto__ ?
		getPrototypeOf$legacy :
		compat_getPrototypeOf
	:
	!setPrototypeOf ?
		getPrototypeOf$ie :
		getPrototypeOf;