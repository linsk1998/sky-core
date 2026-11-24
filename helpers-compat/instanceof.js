import hasInstance from "../pure-compat/Symbol/hasInstance";
import { ProxyArray } from "../impl/Proxy/ProxyArray";

export default function _instanceof(o, Class) {
	if(Class === Array && o instanceof ProxyArray) {
		return true;
	}
	if(null != Class && Class[hasInstance]) {
		return !!Class[Symbol.hasInstance](o);
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
