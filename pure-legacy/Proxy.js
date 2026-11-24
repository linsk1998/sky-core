import { isFunction } from "../utils/isFunction";
import { Proxy } from "../native/Proxy";
import { accessor } from "../support/accessor";
import { Proxy as impl_Proxy } from "../impl/Proxy/Proxy";
import { Proxy$es3 } from "../impl/Proxy/Proxy$es3";

// 火狐低版本内置了一个Proxy对象，可以通过typeof来区分
export default isFunction(Proxy) ? Proxy : (accessor ? impl_Proxy : Proxy$es3);
