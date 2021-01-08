import { Reflect } from "../../native/Reflect";
import { accessor } from "../support/accessor";
import { set as modern_set } from "../../impl-modern/Reflect/set";
import { set as compat_set } from "../../impl-compat/Reflect/set";
export default Reflect ? Reflect.set : (accessor ? modern_set : compat_set);