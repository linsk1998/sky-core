import { Reflect } from "../../native/Reflect";
import { defineProperty } from "../../impl/Reflect/defineProperty";
export default Reflect ? Reflect.defineProperty : defineProperty;