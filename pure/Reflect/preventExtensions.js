import { Reflect } from "../../native/Reflect";
import { preventExtensions } from "../../impl/Reflect/preventExtensions";

export default Reflect ? Reflect.preventExtensions : preventExtensions;
