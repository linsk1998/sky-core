import { setPrototypeOf as modern_setPrototypeOf } from "../../impl-modern/Object/setPrototypeOf";
import { setPrototypeOf as compat_setPrototypeOf } from "../../impl-compat/Object/setPrototypeOf";
export default Object.setPrototypeOf || (Object.prototype.__proto__ ? modern_setPrototypeOf : compat_setPrototypeOf);