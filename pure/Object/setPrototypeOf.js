import { hasEnumBug } from "../../utils/hasEnumBug";
import { ff_setPrototypeOf, ie_setPrototypeOf } from "../../impl-modern/Object/setPrototypeOf";
import { setPrototypeOf as compat_setPrototypeOf } from "../../impl-compat/Object/setPrototypeOf";
import { Object } from "../../native/Object";
import { setPrototypeOf } from "../../native/Object/setPrototypeOf";
export default setPrototypeOf || (
	Object.__proto__ ?
		ff_setPrototypeOf :
		hasEnumBug ?
			compat_setPrototypeOf :
			ie_setPrototypeOf

);
