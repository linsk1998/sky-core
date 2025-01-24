import { Reflect } from "../../native/Reflect";
import { set } from "../../impl-modern/Reflect/set";
export default Reflect ? Reflect.set : set;