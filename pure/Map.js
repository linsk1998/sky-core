import { Symbol } from "../native/Symbol";
import iterator from "sky-core/pure/Symbol/iterator";
import { Map } from "../native/Map";
import { fixMap, createSubMap } from "../impl-modern/Map";
import { createMap } from "../impl-compat/Map";

export default (function() {
	if(!Symbol) {
		if(Map && (Map.prototype.iterator || Map.prototype['@@iterator'])) {
			return fixMap();
		} else {
			return createMap();
		}
	} else {
		if(!Map.prototype[iterator]) {
			var SubMap = createSubMap();
			SubMap.prototype[iterator] = SubMap.prototype.entries;
			return SubMap;
		}
		return Map;
	}
})();