
import { Map } from "../native/Map";
import { fixMap } from "../impl-modern/Map";
import { createMap } from "../impl-compat/Map";
export default (function() {
	if(Map) {
		if(!Symbol || !Map.prototype[Symbol.iterator]) {
			var M = fixMap();
			M.prototype[Symbol.iterator] = M.prototype.entries;
			return M;
		}
	} else {
		return createMap();
	}
	return Map;
})();