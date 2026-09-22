import { Reflect } from "../../native/Reflect";
import { apply } from "../../impl/Reflect/apply";

export default Reflect ? Reflect.apply : apply;