import { Symbol } from "../native/Symbol";
import { Symbol as impl_Symbol } from "../impl/Symbol/Symbol";

export default Symbol ? function(o) {
	return typeof o;
} : function(o) {
	var type = typeof o;
	if(o && type === "object") {
		return o instanceof impl_Symbol ? "symbol" : type;
	}
	return type;
};