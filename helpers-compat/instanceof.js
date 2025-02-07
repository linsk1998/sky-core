import hasInstance from "../pure-compat/Symbol/hasInstance";

export default function _instanceof(n, e) {
	return null != e && e[hasInstance] ? !!e[Symbol.hasInstance](n) : __instanceof(n, e);
}

function __instanceof(n, e) {
	var p = n.__proto__;
	return p ? __instanceof(p, e) : n === e.prototype || n instanceof e;
}