
import { Reflect } from "../../native/Reflect";
import { construct } from "../../impl/Reflect/construct";
export default Reflect ? Reflect.construct : construct;