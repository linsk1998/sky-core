import { supportAccessor } from "../../utils/supportAccessor";
import { deleteProperty as modern_deleteProperty } from "../../impl-modern/Reflect/deleteProperty";
import { deleteProperty as compat_deleteProperty } from "../../impl-compat/Reflect/deleteProperty";
export var deleteProperty = Reflect.deleteProperty || (supportAccessor ? modern_deleteProperty : compat_deleteProperty);