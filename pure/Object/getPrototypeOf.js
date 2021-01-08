
import { getPrototypeOf as modern_getPrototypeOf } from "../../impl-modern/Object/getPrototypeOf";
import { getPrototypeOf as compat_getPrototypeOf } from "../../impl-compat/Object/getPrototypeOf";

export default Object.getPrototypeOf || (Object.prototype.__proto__ ? modern_getPrototypeOf : compat_getPrototypeOf);