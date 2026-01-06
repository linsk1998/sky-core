import { Reflect } from "../../native/Reflect";
import { setPrototypeOf } from "../../impl/Reflect/setPrototypeOf";

export default Reflect ? Reflect.setPrototypeOf : setPrototypeOf;