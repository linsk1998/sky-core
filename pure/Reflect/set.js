import { supportAccessor } from "../../utils/supportAccessor";
import { set as modern_set } from "../../impl-modern/Reflect/set";
import { set as compat_set } from "../../impl-compat/Reflect/set";
export var set = Reflect.set || (supportAccessor ? modern_set : compat_set);