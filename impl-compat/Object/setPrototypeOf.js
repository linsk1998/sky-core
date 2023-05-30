import { dontEnums } from "../../utils-compat/dontEnums";

export function setPrototypeOf(o, proto) {
	o.__proto__ = proto;
	var key;
	for(key in proto) {
		switch(key) {
			case "__proto__":
				continue;
		}
		if(Object.prototype.hasOwnProperty.call(proto, key)) {
			o[key] = proto[key];
		}
	}
	var i = dontEnums.length;
	while(i-- > 0) {
		key = dontEnums[i];
		if(Object.prototype.hasOwnProperty.call(proto, key)) {
			o[key] = proto[key];
		}
	}
	return o;
}
