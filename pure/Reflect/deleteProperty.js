import { Reflect } from "../../native/Reflect";
import { deleteProperty } from "../../impl/Reflect/deleteProperty";

export default Reflect ? Reflect.deleteProperty : deleteProperty;
