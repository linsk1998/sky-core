import { Symbol } from "../native/Symbol";
import iterator from "sky-core/pure/Symbol/iterator";
import { Map } from "../native/Map";
import { checkMapSupportConstructorIteratorReturn } from "../impl/Map/checkMapSupportConstructorIteratorReturn";
import { fix_Map$v8 } from "../impl/Map/fix_Map$v8";
import { fix_Map$arg } from "../impl/Map/fix_Map$arg";
import { fix_Map } from "../impl/Map/fix_Map";
import { create_Map } from "../impl/Map/create_Map";

export default (function() {
	if(Symbol) {
		if(Symbol.iterator) {
			if(!checkMapSupportConstructorIteratorReturn()) {
				return fix_Map$v8(Map);
			}
		} else {
			var SubMap = fix_Map$arg(Map);
			SubMap.prototype[iterator] = SubMap.prototype.entries;
			return SubMap;
		}
	} else {
		if(Map && (Map.prototype.iterator || Map.prototype['@@iterator'])) {
			return fix_Map();
		} else {
			return create_Map();
		}
	}
	return Map;
})();
