import { nullProto } from "../../support/nullProto";

export var create = nullProto ?
	function create(proto, properties) {
		var o = {};
		if(proto === null) {
			o.__proto__ = nullProto;
		} else {
			o.__proto__ = proto;
		}
		if(properties) {
			Object.defineProperties(o, properties);
		}
		return o;
	}
	: function create(proto, properties) {
		var o = {};
		Object.setPrototypeOf(o, proto);
		if(properties) {
			Object.defineProperties(o, properties);
		}
		return o;
	};
