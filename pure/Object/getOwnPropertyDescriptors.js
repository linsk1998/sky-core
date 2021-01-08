
import { getOwnPropertyDescriptors as compat_getOwnPropertyDescriptors } from "../../impl-compat/Object/getOwnPropertyDescriptors";
import { getOwnPropertyDescriptors as modern_getOwnPropertyDescriptors } from "../../impl-modern/Object/getOwnPropertyDescriptors";

export default Object.getOwnPropertyDescriptors || (Object.prototype.__defineSetter__ ? modern_getOwnPropertyDescriptors : compat_getOwnPropertyDescriptors);