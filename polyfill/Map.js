import { Symbol } from "../native/Symbol";
import { Map } from "../native/Map";
import { checkMapSupportConstructorIteratorReturn } from "../impl/Map/checkMapSupportConstructorIteratorReturn";
import { fix_Map$v8 } from "../impl/Map/fix_Map$v8";
import { fix_Map } from "../impl/Map/fix_Map";
import { create_Map } from "../impl/Map/create_Map";

if(Symbol) {
	if(Symbol.iterator) {
		if(!checkMapSupportConstructorIteratorReturn()) {
			window.Map = fix_Map$v8(Map);
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
		window.Map = fix_Map();
	} else {
		window.Map = create_Map();
	}
}
