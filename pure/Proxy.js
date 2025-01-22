import { Proxy } from "../native/Proxy";
import { Proxy as impl_Proxy } from "../impl/Proxy";

export default Proxy || impl_Proxy;