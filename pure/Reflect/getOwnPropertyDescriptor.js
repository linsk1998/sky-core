import { Reflect } from "../../native/Reflect";
import { getOwnPropertyDescriptor } from "../../impl/Reflect/getOwnPropertyDescriptor";

export default Reflect ? Reflect.getOwnPropertyDescriptor : getOwnPropertyDescriptor;