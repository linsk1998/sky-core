import { apply } from "../../impl/Reflect/apply";
import { Reflect } from "../../native/Reflect";
export default Reflect ? Reflect.apply : apply;