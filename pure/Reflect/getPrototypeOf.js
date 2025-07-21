import { Reflect } from "../../native/Reflect";
import { getPrototypeOf } from "../../impl/Reflect/getPrototypeOf";

export default Reflect ? Reflect.getPrototypeOf : getPrototypeOf;