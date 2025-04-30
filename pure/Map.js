import { Symbol } from "../native/Symbol";
import iterator from "sky-core/pure/Symbol/iterator";
import { Map } from "../native/Map";
import { fixMap, createSubMap, checkMapSupportConstructorIteratorReturn, createAndFixSubMap } from "../impl-modern/Map";
import { createMap } from "../impl-compat/Map";

export default (function() {
	if(Symbol) {
		if(Symbol.iterator) {
			if(!checkMapSupportConstructorIteratorReturn()) {
				return createAndFixSubMap();
			}
		} else {
			var SubMap = createSubMap();
			SubMap.prototype[iterator] = SubMap.prototype.entries;
			return SubMap;
		}
	} else {
		if(Map && (Map.prototype.iterator || Map.prototype['@@iterator'])) {
			return fixMap();
		} else {
			return createMap();
		}
	}
	return Map;
})();