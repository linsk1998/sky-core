import { ProxyArray } from "../impl/Proxy/ProxyArray";

export default function _instanceof(o, Class) {
	if(Class === Array && o instanceof ProxyArray) {
		return true;
	}
	return __instanceof(o, Class);
}

function __instanceof(o, Class) {
	while(o != null) {
		if(o === Class.prototype) {
			return true;
		}
		o = o.__proto__;
	}
	return false;
}
