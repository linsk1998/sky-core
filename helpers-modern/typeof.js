import { Symbol } from "../native/Symbol";
import { isRegExp } from "../utils/isRegExp";
import { Symbol as impl_Symbol } from "../impl/Symbol";

export default Symbol ? function(o) {
	return typeof o;
} : function(o) {
	var type = typeof o;
	if(o) {
		switch(type) {
			case "function":
				return isRegExp(o) ? "object" : type;
			case "object":
				return o instanceof impl_Symbol ? "symbol" : type;
		}
	}
	return type;
};