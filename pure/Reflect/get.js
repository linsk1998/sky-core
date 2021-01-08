import { Reflect } from "../../native/Reflect";
import { accessor } from "../support/accessor";
import { get as modern_get } from "../../impl-modern/Reflect/get";
import { get as compat_get } from "../../impl-compat/Reflect/get";
export default Reflect ? Reflect.get : (accessor ? modern_get : compat_get);