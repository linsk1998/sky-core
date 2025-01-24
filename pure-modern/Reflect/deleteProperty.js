import { Reflect } from "../../native/Reflect";
import { deleteProperty } from "../../impl-modern/Reflect/deleteProperty";
export default Reflect ? Reflect.deleteProperty : deleteProperty;