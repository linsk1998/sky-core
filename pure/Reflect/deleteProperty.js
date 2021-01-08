import { Reflect } from "../../native/Reflect";
import { accessor } from "../support/accessor";
import { deleteProperty as modern_deleteProperty } from "../../impl-modern/Reflect/deleteProperty";
import { deleteProperty as compat_deleteProperty } from "../../impl-compat/Reflect/deleteProperty";
export default Reflect ? Reflect.deleteProperty : (accessor ? modern_deleteProperty : compat_deleteProperty);