import { Symbol } from "../native/Symbol";
import { Map } from "../native/Map";
import { fixMap } from "../impl-modern/Map";
import { createMap } from "../impl-compat/Map";

if(!Symbol) {
	if(Map && (Map.prototype.iterator || Map.prototype['@@iterator'])) {
		window.Map = fixMap();
	} else {
		window.Map = createMap();
	}
} else {
	if(!Symbol.iterator) {
		Symbol.iterator = Symbol('iterator');
	}
	if(!Map.prototype[Symbol.iterator]) {
		Map.prototype[Symbol.iterator] = Map.prototype.entries;
	}
}