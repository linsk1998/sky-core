import { Reflect } from "../../native/Reflect";
import { get } from "../../impl/Reflect/get";

export default Reflect ? Reflect.get : get;
