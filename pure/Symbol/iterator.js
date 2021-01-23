import { Symbol } from "../../native/Symbol";

export default (function() {
	if(!Symbol) {
		return "@@iterator";
	} else {
		return Symbol.iterator || Symbol("iterator");
	}
})();