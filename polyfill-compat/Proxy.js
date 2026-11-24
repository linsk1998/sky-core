import { isFunction } from "../utils/isFunction";
import { Proxy as native_Proxy } from "../native/Proxy";
import { Proxy$vb } from "../impl/Proxy/Proxy$vb";

// 火狐低版本内置了一个Proxy对象，可以通过typeof来区分
var Proxy = native_Proxy;
if(!isFunction(Proxy)) {
	Proxy = window.Proxy = Proxy$vb;
}
export { Proxy };
