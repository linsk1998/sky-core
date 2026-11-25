import { Reflect } from "../../native/Reflect";
import { isExtensible } from "../../impl/Reflect/isExtensible";

export default Reflect ? Reflect.isExtensible : isExtensible;
