import { Symbol } from "../native/Symbol";
import { Map } from "../native/Map";
import { fixMap, createSubMap } from "../impl-modern/Map";
import { createMap } from "../impl-compat/Map";
import { checkMapSupportConstructorIteratorReturn } from "../utils-modern/checkMapSupportConstructorIteratorReturn";

if(Symbol) {
	if(Symbol.iterator) {
		if(checkMapSupportConstructorIteratorReturn()) {
			window.Map = createSubMap();
		}
	} else {
		// Safari8 支持entries
		// Safari9 支持Symbol
		// Safari10 支持iterator
		Symbol.iterator = Symbol('iterator');
		Map.prototype[Symbol.iterator] = Map.prototype.entries;
	}
} else {
	if(Map && (Map.prototype.iterator || Map.prototype['@@iterator'])) {
		window.Map = fixMap();
	} else {
		window.Map = createMap();
	}
}