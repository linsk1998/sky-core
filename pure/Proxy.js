import { isFunction } from "../utils/isFunction";
import { Proxy } from "../native/Proxy";
import { Proxy as impl_Proxy } from "../impl/Proxy";

// 火狐低版本内置了一个Proxy对象，可以通过typeof来区分
export default isFunction(Proxy) ? Proxy : impl_Proxy;