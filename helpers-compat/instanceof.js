import hasInstance from "../pure-compat/Symbol/hasInstance";

export default function _instanceof(o, Class) {
	return null != Class && Class[hasInstance] ? !!Class[Symbol.hasInstance](o) : __instanceof(o, Class);
}

function __instanceof(o, Class) {
	var p = o.__proto__;
	return p ? __instanceof(p, Class) : o === Class.prototype || o instanceof Class;
}