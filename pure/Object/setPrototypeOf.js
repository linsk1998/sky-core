import native_Object from "../../native/Object";
import { setPrototypeOf as modern_setPrototypeOf } from "../../impl-modern/Object/setPrototypeOf";
import { setPrototypeOf as compat_setPrototypeOf } from "../../impl-compat/Object/setPrototypeOf";
export default native_Object.setPrototypeOf || (native_Object.prototype.__proto__ ? modern_setPrototypeOf : compat_setPrototypeOf);