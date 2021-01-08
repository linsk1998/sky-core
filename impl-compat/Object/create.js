//var defineProperties = require("sky-core/pure/Object/defineProperties");
export function create(proto, properties) {
	function F() { }
	F.prototype = proto;
	var o = new F();
	if(properties) {
		Object.defineProperties(o, properties);
	}
	return o;
};
