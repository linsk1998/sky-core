import { ProxyArray } from "../impl/Proxy/ProxyArray";

export default function _instanceof(o, Class) {
	if(Class === Array && o instanceof ProxyArray) {
		return true;
	}
	return null != Class && typeof Symbol !== "undefined" && Class[Symbol.hasInstance] ?
		!!Class[Symbol.hasInstance](o) :
		o instanceof Class;
}
