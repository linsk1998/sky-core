import { Reflect } from "../../native/Reflect";
import { set } from "../../impl/Reflect/set";

export default Reflect ? Reflect.set : set;
