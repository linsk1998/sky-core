import { Proxy as native_Proxy } from "../native/Proxy";
import { Proxy as impl_Proxy } from "../impl/Proxy";

var Proxy = native_Proxy;
if(!Proxy) {
	Proxy = window.Proxy = impl_Proxy;
}
export { Proxy };