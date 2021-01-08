import { Symbol } from "../native/Symbol";
import { Map } from "../native/Map";
import { fixMap } from "../impl-modern/Map";
import { createMap } from "../impl-compat/Map";
export default (function() {
	if(Map) {
		if(!Symbol || !Map.prototype[Symbol.iterator]){
			return fixMap();
		}
	} else {
		return createMap();
	}
	return Map;
})();