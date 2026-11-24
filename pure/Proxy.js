import { isFunction } from "../utils/isFunction";
import { Proxy } from "../native/Proxy";
import { accessor } from "../support/accessor";
import { Proxy as impl_Proxy } from "../impl/Proxy/Proxy";
import { Proxy$es3 } from "../impl/Proxy/Proxy$es3";
import { Proxy$vb } from "../impl/Proxy/Proxy$vb";

// 火狐低版本内置了一个Proxy对象，可以通过typeof来区分
export default isFunction(Proxy) ? Proxy : (accessor ? impl_Proxy : (typeof window.execScript == "function" ? Proxy$vb : Proxy$es3));
