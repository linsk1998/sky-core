import { Reflect } from "../../native/Reflect";
import { get } from "../../impl-modern/Reflect/get";
export default Reflect ? Reflect.get : get;