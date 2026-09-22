import { Reflect } from "../../native/Reflect";
import { has } from "../../impl/Reflect/has";

export default Reflect ? Reflect.has : has;