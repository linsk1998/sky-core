import { Symbol } from "../../native/Symbol";

export default (function() {
	if(!Symbol) {
		return "@@hasInstance";
	} else {
		return Symbol.hasInstance || Symbol("hasInstance");
	}
})();