import { supportAccessor } from "../../utils/supportAccessor";
import { get as modern_get } from "../../impl-modern/Reflect/get";
import { get as compat_get } from "../../impl-compat/Reflect/get";
export var get = Reflect.get || (supportAccessor ? modern_get : compat_get);