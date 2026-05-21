import { getPrototypeOf$legacy, getPrototypeOf$ie } from "../../impl-modern/Object/getPrototypeOf";
import { Object } from "../../native/Object";
import { getPrototypeOf } from "../../native/Object/getPrototypeOf";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
export default !getPrototypeOf ?
	Object.__proto__ ?
		getPrototypeOf$legacy :
		getPrototypeOf$ie
	:
	!setPrototypeOf ?
		getPrototypeOf$ie :
		getPrototypeOf
	;
