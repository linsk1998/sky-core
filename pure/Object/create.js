import { create as modern_create } from "../../impl-modern/Object/create";
import { create as compat_create } from "../../impl-compat/Object/create";
export default Object.create || (Object.__proto__ ? modern_create : compat_create);